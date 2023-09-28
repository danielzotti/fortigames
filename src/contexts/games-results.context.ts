import { createContextId, Signal } from "@builder.io/qwik";
import { GamesResults } from "~/types/games.types";

export const gamesResultsDefault: GamesResults = {
  volley: {
    tigers: 0,
    dragons: 0,
  },
  soccer: {
    tigers: 0,
    dragons: 0,
  },
  table_tennis: {
    tigers: 0,
    dragons: 0,
  },
};

export const GamesResultsContext = createContextId<GamesResults>(
  "games-results-context",
);
