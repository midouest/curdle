import { KeyboardEvent, useCallback } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { PlayGame, NewGame } from "./features/games";

export const App = () => {
  const ignoreKeyDown = useCallback(
    (event: KeyboardEvent) => event.preventDefault(),
    []
  );

  return (
    <>
      <header className="AppHeader">
        <div className="Title">Curdle</div>
        <Link className="Link" to="games" onKeyDown={ignoreKeyDown}>
          New Game
        </Link>
      </header>
      <div className="App">
        <Routes>
          <Route path="games">
            <Route path=":id" element={<PlayGame />} />
            <Route path="" element={<NewGame />} />
          </Route>
          <Route path="*" element={<Navigate to="games" />} />
        </Routes>
      </div>
    </>
  );
};
