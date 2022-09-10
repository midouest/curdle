import { useCallback } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "./useWindowSize";

export const Cheesefetti = () => {
  const { width, height } = useWindowSize();

  const drawShape = useCallback((context: CanvasRenderingContext2D) => {
    context.font = "100px serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("🧀", 0, 0);
  }, []);

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={20}
      drawShape={drawShape}
      recycle={true}
    />
  );
};
