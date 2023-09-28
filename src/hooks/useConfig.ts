import { $, useComputed$, useContext } from "@builder.io/qwik";
import { supabaseClient } from "~/supabase/supabase-client";
import { ConfigContext } from "~/contexts/config.context";
import { Config } from "~/types/config.types";

export const useConfig = () => {
  const config = useContext(ConfigContext);

  const isGamesEnded = useComputed$(() => {
    return !!config.games_ended_at;
  });

  const isGamesStarted = useComputed$(() => {
    return !!config.games_started_at;
  });

  const isGamesWaiting = useComputed$(() => {
    return !config.games_started_at && !config.games_ended_at;
  });

  const countdownDate = useComputed$(() => {
    return config.games_started_at ? config.planned_end : config.planned_start;
  });

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
          Object.entries(payload.new).forEach(([key, value]) => {
            // @ts-ignore
            config[key as keyof Config] = value as any;
          });
        },
      )
      .subscribe();
  });

  return {
    initializeContext,
    config,
    isGamesEnded,
    isGamesStarted,
    isGamesWaiting,
    countdownDate,
  };
};
