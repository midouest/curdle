import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateGuess, useQueryGame } from "./gameStub";
import {
  GameForm,
  InvalidWord,
  Loading,
  maxLetters,
  NotEnoughLetters,
} from "./internal";

export const PlayGame = () => {
  const [guess, setGuess] = useState("");
  const [tooShort, setTooShort] = useState(false);

  const { id: idParam } = useParams();
  const gameId = parseInt(idParam!);

  const game = useQueryGame(gameId);
  const [createGuess, invalidGuess] = useCreateGuess();

  const handleChange = useCallback(
    (word: string) => {
      setGuess(word);
      setTooShort(false);
    },
    [setGuess]
  );

  const handleSubmit = useCallback(() => {
    if (guess.length < maxLetters) {
      setTooShort(true);
      return;
    }

    createGuess(guess)
      .then(() => setGuess(""))
      .catch();
  }, [createGuess, guess]);

  if (!game) {
    return <Loading />;
  }

  return (
    <>
      <GameForm
        game={game}
        guess={guess}
        invalidGuess={invalidGuess || tooShort}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      {tooShort && <NotEnoughLetters />}
      {invalidGuess && <InvalidWord />}
    </>
  );
};
