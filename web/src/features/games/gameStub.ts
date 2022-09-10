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
          char: "a",
          state: "present",
        },
        {
          char: "u",
          state: "absent",
        },
        {
          char: "c",
          state: "absent",
        },
        {
          char: "e",
          state: "correct",
        },
      ],
    },
    {
      id: 2,
      letters: [
        {
          char: "g",
          state: "correct",
        },
        {
          char: "r",
          state: "correct",
        },
        {
          char: "a",
          state: "correct",
        },
        {
          char: "z",
          state: "absent",
        },
        {
          char: "e",
          state: "correct",
        },
      ],
    },
    {
      id: 3,
      letters: [
        {
          char: "g",
          state: "correct",
        },
        {
          char: "r",
          state: "correct",
        },
        {
          char: "a",
          state: "correct",
        },
        {
          char: "d",
          state: "absent",
        },
        {
          char: "e",
          state: "correct",
        },
      ],
    },
  ],
  answer: null,
  alphabet: {
    a: "correct",
    c: "absent",
    d: "absent",
    e: "correct",
    g: "correct",
    r: "correct",
    s: "absent",
    u: "absent",
    z: "absent",
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
