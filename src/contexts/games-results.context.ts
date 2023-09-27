import { createContextId, Signal } from "@builder.io/qwik";
import { AuthSession } from "~/types/auth.types";
import { GamesResults } from "~/types/games.types";

export const GamesResultsContext = createContextId<GamesResults>(
  "games-results-context",
);
