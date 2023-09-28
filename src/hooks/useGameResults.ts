import { $, useContext } from "@builder.io/qwik";
import { GamesResultsContext } from "~/contexts/games-results.context";
import { Games, GamesResults, SportGames } from "~/types/games.types";
import { supabaseClient } from "~/supabase/supabase-client";

export const useGamesResults = () => {
  const results = useContext(GamesResultsContext);

  const resultsByGame = $((game: SportGames) => results[game]);

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

  return { initializeContext, results, resultsByGame };
};
