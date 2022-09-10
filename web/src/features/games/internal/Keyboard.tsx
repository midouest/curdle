import { useCallback, useEffect, useMemo } from "react";
import { AlphaKey } from "./AlphaKey";
import { BackspaceIcon } from "./BackspaceIcon";
import { ControlKey } from "./ControlKey";
import { LetterState } from "../gameApi";

const keyboardSpacerRow = 1;
const keyboardControlRow = 2;

interface KeyboardProps {
  enabled: boolean;
  alphabet: Record<string, LetterState>;
  onCharPress: (content: string) => void;
  onEnterPress: () => void;
  onDeletePress: () => void;
}

export const Keyboard = ({
  enabled,
  alphabet,
  onCharPress,
  onEnterPress,
  onDeletePress,
}: KeyboardProps) => {
  const layout = useMemo(getKeyboardLayout, []);

  const handleEnter = useCallback(
    () => enabled && onEnterPress(),
    [enabled, onEnterPress]
  );
  const handleDelete = useCallback(
    () => enabled && onDeletePress(),
    [enabled, onDeletePress]
  );
  const handleChar = useCallback(
    (char: string) => enabled && onCharPress(char),
    [enabled, onCharPress]
  );

  const handleKeyDown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === "Enter") {
        handleEnter();
      } else if (key === "Backspace") {
        handleDelete();
      } else if (isAlphaKey(key)) {
        handleChar(key);
      }
    },
    [handleEnter, handleDelete, handleChar]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="Keyboard">
      {layout.map((row, index) => {
        const showSpacers = index === keyboardSpacerRow;
        const showControls = index === keyboardControlRow;
        return (
          <div key={index} className="KeyboardRow">
            {showSpacers && <div className="KeySpacer" />}
            {showControls && (
              <ControlKey onPress={handleEnter}>Enter</ControlKey>
            )}
            {row.map((content) => {
              const state = alphabet[content];
              return (
                <AlphaKey
                  key={content}
                  content={content}
                  state={state}
                  onPress={handleChar}
                />
              );
            })}
            {showSpacers && <div className="KeySpacer" />}
            {showControls && (
              <ControlKey onPress={handleDelete}>
                <BackspaceIcon />
              </ControlKey>
            )}
          </div>
        );
      })}
    </div>
  );
};

function isAlphaKey(key: string): boolean {
  return (
    key.length === 1 &&
    ((key >= "a" && key <= "z") || (key >= "A" && key <= "Z"))
  );
}

function getKeyboardLayout(): string[][] {
  return ["qwertyuiop", "asdfghjkl", "zxcvbnm"].map((row) => Array.from(row));
}
