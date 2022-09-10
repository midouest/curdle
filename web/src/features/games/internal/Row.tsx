import { maxLetters } from "./constants";
import { Letter } from "../gameApi";
import { Tile } from "./Tile";
import { useMemo, useState } from "react";
import { useMount } from "./useMount";

const animationDelay = 100;
const animationHalfTime = 250;

interface RowProps {
  letters: Partial<Letter>[];
  invalid?: boolean;
}

export const Row = ({ letters, invalid }: RowProps) => {
  const emptyCells = maxLetters - letters.length;
  const guessState = useMemo(() => getGuessState(letters), [letters]);
  const [revealed, setRevealed] = useState(0);
  const [completed, setCompleted] = useState(0);
  const isSubmitted = guessState === "incorrect" || guessState === "correct";

  useMount(() => {
    if (!isSubmitted) {
      return;
    }

    for (let i = 0; i < maxLetters; i++) {
      const ms = i * animationDelay + animationHalfTime;
      wait(ms)
        .then(() => setRevealed(i + 1))
        .then(() => wait(animationHalfTime))
        .then(() => setCompleted(i + 1));
    }
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
