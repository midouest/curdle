import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useApiGamesRetrieveQuery,
  useApiGuessesCreateMutation,
} from "./gameApi";
import { GameForm, InvalidWord, Loading } from "./internal";

export const PlayGame = () => {
  const [guess, setGuess] = useState("");

  const { id: idParam } = useParams();
  const gameId = parseInt(idParam!);

  const { data: game } = useApiGamesRetrieveQuery(gameId);
  const [createGuess, { isError: invalidGuess }] =
    useApiGuessesCreateMutation();

  const handleChange = useCallback(
    (word: string) => setGuess(word),
    [setGuess]
  );

  const handleSubmit = useCallback(() => {
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
        invalidGuess={invalidGuess}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      {invalidGuess && <InvalidWord />}
    </>
  );
};
