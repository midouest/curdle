import { ReactNode, useCallback } from "react";

interface ControlKeyProps {
  onPress: () => void;
  children: ReactNode;
}

export const ControlKey = ({ onPress, children }: ControlKeyProps) => {
  const handleClick = useCallback(() => onPress(), [onPress]);

  return (
    <button className={`Key control `} onClick={handleClick}>
      {children}
    </button>
  );
};
