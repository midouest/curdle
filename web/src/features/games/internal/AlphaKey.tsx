import { useCallback } from "react";
import { LetterState } from "../gameApi";

interface AlphaKeyProps {
  content: string;
  state?: LetterState;
  onPress: (content: string) => void;
}

export const AlphaKey = ({ content, state, onPress }: AlphaKeyProps) => {
  const handleClick = useCallback(() => onPress(content), [content, onPress]);

  return (
    <button className={`Key alpha ${state ?? ""}`} onClick={handleClick}>
      {content}
    </button>
  );
};
