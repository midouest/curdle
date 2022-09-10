import { maxLetters } from "./constants";
import { Letter } from "../gameApi";
import { Tile } from "./Tile";
import { useMemo, useState } from "react";
import { useMount } from "./useMount";
import { useAppDispatch } from "../../../app/hooks";
import { beginReveal, endReveal } from "./revealSlice";

const animationDelay = 100;
const animationHalfTime = 250;

interface RowProps {
  letters: Partial<Letter>[];
  invalid?: boolean;
}

export const Row = ({ letters, invalid }: RowProps) => {
  const emptyCells = maxLetters - letters.length;
  const dispatch = useAppDispatch();
  const guessState = useMemo(() => getGuessState(letters), [letters]);
  const [revealed, setRevealed] = useState(0);
  const [completed, setCompleted] = useState(0);
  const isSubmitted = guessState === "incorrect" || guessState === "correct";

  useMount(() => {
    if (!isSubmitted) {
      return;
    }

    const animateLetter = async (index: number) => {
      const ms = index * animationDelay + animationHalfTime;
      const revealIndex = index + 1;
      await wait(ms);
      setRevealed(revealIndex);
      await wait(animationHalfTime);
      setCompleted(revealIndex);
    };

    const animate = async () => {
      dispatch(beginReveal());

      const promises = [];
      for (let i = 0; i < maxLetters; i++) {
        promises.push(animateLetter(i));
      }

      await Promise.all(promises);
      dispatch(endReveal());
    };

    animate();
  });

  return (
    <div className={`Row ${invalid ? "shake" : ""}`}>
      {letters.map(({ char, state }, index) => {
        let animationClass = "";
        if (completed >= maxLetters && guessState === "correct") {
          animationClass = "bounce";
        } else if (isSubmitted) {
          animationClass = "flip";
        }
        return (
          <div
            key={`${char}-${index}`}
            className={animationClass}
            style={{
              animationDelay: `${index * animationDelay}ms`,
            }}
          >
            <Tile char={char} state={revealed > index ? state : undefined} />
          </div>
        );
      })}
      {Array.from({ length: emptyCells }).map((_, index) => (
        <Tile key={`empty-${index}`} />
      ))}
    </div>
  );
};

type GuessState = "invalid" | "incorrect" | "correct";

function getGuessState(letters: Partial<Letter>[]): GuessState | undefined {
  for (const { state } of letters) {
    if (state === undefined) {
      return undefined;
    }
    if (state !== "correct") {
      return "incorrect";
    }
  }
  return "correct";
}

function wait(ms?: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
