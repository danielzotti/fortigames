import { $, useComputed$, useContext } from "@builder.io/qwik";
import { supabaseClient } from "~/supabase/supabase-client";
import { ConfigContext } from "~/contexts/config.context";
import { Config } from "~/types/config.types";
import { TeamsValues } from "~/types/teams.types";

export const useConfig = () => {
  const config = useContext(ConfigContext);

  const isGamesEnded = useComputed$(() => !!config.games_ended_at);

  const isGamesStarted = useComputed$(
    () =>
      !!config.games_started_at && !config.games_ended_at && !config.is_paused,
  );

  const isGamesPaused = useComputed$(() => config.is_paused);

  const isGamesWaiting = useComputed$(
    () =>
      !config.games_started_at && !config.games_ended_at && !config.is_paused,
  );

  const countdownDate = useComputed$(() =>
    config.games_started_at
      ? config.planned_end
      : config.games_ended_at
      ? config.games_ended_at
      : config.planned_start,
  );

  const winner = useComputed$(() => config.winner as TeamsValues | null);

  const initializeContext = $(async () => {
    const { data } = await supabaseClient.from("config").select("*");
    const dbConfig = data?.[0];
    if (dbConfig) {
      Object.entries(dbConfig).forEach(([key, value]) => {
        // @ts-ignore
        config[key as keyof Config] = value as any;
      });
    }

    supabaseClient
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "config" },
        (payload) => {
          console.log("Config update (payload)", payload);
          Object.entries(payload.new).forEach(([key, value]) => {
            // @ts-ignore
            config[key as keyof Config] = value as any;
          });
          console.log("config", config);
        },
      )
      .subscribe();
  });

  return {
    initializeContext,
    config,
    isGamesEnded,
    isGamesStarted,
    isGamesPaused,
    isGamesWaiting,
    countdownDate,
    winner,
  };
};
