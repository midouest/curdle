import { useMemo } from "react";
import { LetterState } from "../gameApi";

interface TileProps {
  char?: string;
  state?: LetterState;
}

export const Tile = ({ char, state }: TileProps) => {
  const modifierClass = useMemo(() => {
    if (state) {
      return state;
    }
    if (char) {
      return "tbd";
    }
    return "empty";
  }, [char, state]);

  return (
    <div className={`Tile ${modifierClass} ${char && !state ? "pop" : ""}`}>
      {char ?? ""}
    </div>
  );
};
