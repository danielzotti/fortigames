import { createContextId, Signal } from "@builder.io/qwik";
import { AuthSession } from "~/types/auth.types";
import { GamesResults } from "~/types/games.types";
import { Config } from "~/types/config.types";

export const configDefault: Config = {
  games_ended_at: null,
  games_started_at: null,
  id: 1,
  planned_end: null,
  planned_start: null,
  winner: null,
};
export const ConfigContext = createContextId<Config>("config-context");
