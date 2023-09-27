import { $, useContext, useVisibleTask$ } from "@builder.io/qwik";
import { AuthContext } from "~/contexts/auth.context";
import { GamesResultsContext } from "~/contexts/games-results.context";
import { GamesResults } from "~/types/games.types";
import { supabaseClient } from "~/supabase/supabase-client";

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

export const useGamesResults = () => {
  const results = useContext(GamesResultsContext);

  const initializeContext = $(async () => {
    const { data } = await supabaseClient.from("games_results").select("*");
    data?.forEach((row) => {
      results[row.name as keyof GamesResults].tigers = row.tigers;
      results[row.name as keyof GamesResults].dragons = row.dragons;
    });

    supabaseClient
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "games_results" },
        (payload) => {
          results[payload.new.name as keyof GamesResults].tigers =
            payload.new.tigers;
          results[payload.new.name as keyof GamesResults].dragons =
            payload.new.dragons;
        },
      )
      .subscribe();
  });

  return { initializeContext, results };
};
