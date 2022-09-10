import { baseSplitApi as api } from "../../app/baseApi";
export const addTagTypes = ["games"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      apiGamesCreate: build.mutation<
        ApiGamesCreateApiResponse,
        ApiGamesCreateApiArg
      >({
        query: () => ({ url: `/api/games/`, method: "POST" }),
        invalidatesTags: ["games"],
      }),
      apiGamesRetrieve: build.query<
        ApiGamesRetrieveApiResponse,
        ApiGamesRetrieveApiArg
      >({
        query: (queryArg) => ({ url: `/api/games/${queryArg}/` }),
        providesTags: ["games"],
      }),
      apiGuessesCreate: build.mutation<
        ApiGuessesCreateApiResponse,
        ApiGuessesCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/guesses/`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["games"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as gameApi };
export type ApiGamesCreateApiResponse = /** status 201  */ Game;
export type ApiGamesCreateApiArg = void;
export type ApiGamesRetrieveApiResponse = /** status 200  */ Game;
export type ApiGamesRetrieveApiArg =
  /** A unique integer value identifying this game. */ number;
export type ApiGuessesCreateApiResponse = /** status 201  */ Guess;
export type ApiGuessesCreateApiArg = GuessRequest;
export type GameState = "playing" | "won" | "lost";
export type LetterState = "absent" | "present" | "correct";
export type Letter = {
  char: string;
  state: LetterState;
};
export type Result = {
  id: number;
  letters: Letter[];
};
export type Game = {
  id: number;
  answer: string | null;
  state: GameState;
  results: Result[];
  alphabet: {
    [key: string]: "absent" | "present" | "correct";
  };
};
export type Guess = {
  id: number;
  word: string;
  created_at: string;
  game: number;
};
export type GuessRequest = {
  word: string;
  game: number;
};
export const {
  useApiGamesCreateMutation,
  useApiGamesRetrieveQuery,
  useApiGuessesCreateMutation,
} = injectedRtkApi;
