import { Navigate } from "react-router-dom";
import { useCreateGame } from "./gameStub";
import { Loading } from "./internal";

export const NewGame = () => {
  const game = useCreateGame();

  if (!game) {
    return <Loading />;
  }

  return <Navigate to={`/games/${game.id}`} />;
};
