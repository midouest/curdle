import { Navigate } from "react-router-dom";
import { useApiGamesCreateMutation } from "./gameApi";
import { Loading, useMount } from "./internal";

export const NewGame = () => {
  const [createGame, { data: game }] = useApiGamesCreateMutation();

  useMount(() => {
    const request = createGame();
    return () => request.abort();
  });

  if (!game) {
    return <Loading />;
  }

  return <Navigate to={`/games/${game.id}`} />;
};
