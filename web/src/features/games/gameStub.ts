import { useCallback, useState } from "react";
import { Game } from "./gameApi";
import { useMount } from "./internal";

const gameStub: Game = {
  id: 1,
  state: "playing",
  results: [
    {
      id: 1,
      letters: [
        {
          char: "s",
          state: "absent",
        },
        {
          char: "o",
          state: "absent",
        },
        {
          char: "a",
          state: "present",
        },
        {
          char: "r",
          state: "absent",
        },
        {
          char: "e",
          state: "absent",
        },
      ],
    },
    {
      id: 2,
      letters: [
        {
          char: "p",
          state: "absent",
        },
        {
          char: "a",
          state: "correct",
        },
        {
          char: "i",
          state: "present",
        },
        {
          char: "n",
          state: "correct",
        },
        {
          char: "t",
          state: "correct",
        },
      ],
    },
    {
      id: 3,
      letters: [
        {
          char: "g",
          state: "absent",
        },
        {
          char: "a",
          state: "correct",
        },
        {
          char: "u",
          state: "correct",
        },
        {
          char: "n",
          state: "correct",
        },
        {
          char: "t",
          state: "correct",
        },
      ],
    },
  ],
  answer: null,
  alphabet: {
    a: "correct",
    e: "absent",
    g: "absent",
    i: "absent",
    n: "correct",
    o: "absent",
    p: "absent",
    r: "absent",
    s: "absent",
    t: "correct",
    u: "correct",
  },
};

const gameStubById = {
  [gameStub.id]: gameStub,
};

const useStubApi = (callback: () => void) => {
  useMount(() => {
    const duration = Math.round(Math.random() * 200) + 100;
    const timeoutId = setTimeout(callback, duration);
    return () => clearTimeout(timeoutId);
  });
};

export function useCreateGame(): Game | undefined {
  const [game, setGame] = useState<Game | undefined>();
  useStubApi(() => setGame(gameStub));
  return game;
}

export function useQueryGame(id: number): Game | undefined {
  const [game, setGame] = useState<Game | undefined>();
  useStubApi(() => setGame(gameStubById[id]));
  return game;
}

export function useCreateGuess(): [(word: string) => Promise<void>, boolean] {
  const [isError, setIsError] = useState(false);
  const trigger = useCallback(() => {
    setIsError(false);
    return new Promise<void>((_, reject) =>
      setTimeout(() => {
        setIsError(true);
        reject();
      })
    );
  }, [setIsError]);
  return [trigger, isError];
}
