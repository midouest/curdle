import { useCallback, useMemo } from "react";
import { Game, Letter } from "../gameApi";
import { Board } from "./Board";
import { Keyboard } from "./Keyboard";
import { Toast } from "./Toast";
import { Cheesefetti } from "./Cheesefetti";
import { maxLetters } from "./constants";
import { useAppSelector } from "../../../app/hooks";
import { selectRevealComplete } from "./revealSelectors";

const winMessages = [
  "Genius",
  "Magnificent",
  "Impressive",
  "Splendid",
  "Great",
  "Phew",
] as const;

interface GameFormProps {
  game: Game;
  guess: string;
  invalidGuess: boolean;
  onChange: (word: string) => void;
  onSubmit: () => void;
}

export const GameForm = ({
  game,
  guess,
  invalidGuess,
  onChange,
  onSubmit,
}: GameFormProps) => {
  const revealComplete = useAppSelector(selectRevealComplete);

  const guessLetters: Partial<Letter>[] = useMemo(
    () => Array.from(guess).map((char) => ({ char })),
    [guess]
  );

  const handleCharPress = useCallback(
    (char: string) => {
      if (guess.length >= maxLetters) {
        return;
      }

      onChange(guess + char);
    },
    [guess, onChange]
  );

  const handleDeletePress = useCallback(() => {
    if (guess.length === 0) {
      return;
    }

    onChange(guess.slice(0, guess.length - 1));
  }, [guess, onChange]);

  const playing = game.state === "playing";
  const lost = game.state === "lost";
  const won = game.state === "won";

  return (
    <>
      <Board
        results={game.results}
        guess={playing ? guessLetters : undefined}
        invalidGuess={invalidGuess}
      />

      <Keyboard
        enabled={playing}
        alphabet={game.alphabet}
        onCharPress={handleCharPress}
        onDeletePress={handleDeletePress}
        onEnterPress={onSubmit}
      />

      {lost && revealComplete && <Toast>{game.answer!.toUpperCase()}</Toast>}

      {won && revealComplete && (
        <>
          <Toast fadeOut>{winMessages[game.results.length - 1]}</Toast>
          <Cheesefetti />
        </>
      )}
    </>
  );
};
