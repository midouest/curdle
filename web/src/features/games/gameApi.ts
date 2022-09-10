export type GameState = "playing" | "won" | "lost";

export type LetterState = "absent" | "present" | "correct";

export interface Letter {
  char: string;
  state: LetterState;
}

export interface Result {
  id: number;
  letters: Letter[];
}

export interface Game {
  id: number;
  answer: string | null;
  state: GameState;
  results: Result[];
  alphabet: Record<string, LetterState>;
}

export interface Guess {
  id: number;
  word: string;
  created_at: string;
  game: number;
}
