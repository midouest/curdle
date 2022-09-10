import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useApiGamesRetrieveQuery,
  useApiGuessesCreateMutation,
} from "./gameApi";
import { GameForm, InvalidWord, Loading, NotEnoughLetters } from "./internal";
import { maxLetters } from "./internal/constants";

export const PlayGame = () => {
  const [guess, setGuess] = useState("");
  const [tooShort, setTooShort] = useState(false);

  const { id: idParam } = useParams();
  const gameId = parseInt(idParam!);

  const { data: game } = useApiGamesRetrieveQuery(gameId);
  const [createGuess, { isError: invalidGuess }] =
    useApiGuessesCreateMutation();

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

    createGuess({
      game: gameId,
      word: guess,
    })
      .unwrap()
      .then(() => setGuess(""))
      .catch();
  }, [createGuess, gameId, guess]);

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
