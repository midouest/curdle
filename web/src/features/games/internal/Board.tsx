import { Letter, Result } from "../gameApi";
import { Row } from "./Row";

const maxGuesses = 6;

interface BoardProps {
  results: Result[];
  guess?: Partial<Letter>[];
  invalidGuess: boolean;
}

export const Board = ({ results, guess, invalidGuess }: BoardProps) => {
  const placeholderRows = maxGuesses - results.length - (guess ? 1 : 0);
  return (
    <div className="BoardContainer">
      <div className="Board">
        {results.map(({ id, letters }) => (
          <Row key={`result-${id}`} letters={letters} />
        ))}
        {guess && <Row letters={guess} invalid={invalidGuess} />}
        {Array.from({ length: placeholderRows }).map((_, index) => (
          <Row key={`empty-${index}`} letters={[]} />
        ))}
      </div>
    </div>
  );
};
