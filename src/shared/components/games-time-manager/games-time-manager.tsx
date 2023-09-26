import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./games-time-manager.module.scss";
import { supabaseClient } from "~/supabase/supabase-client";
import { DateTime } from "luxon";

interface Config {
  id: number;
  games_started_at?: string | null;
  games_ended_at?: string | null;
  planned_start: string | null;
  planned_end: string | null;
}

export default component$(() => {
  const config = useSignal<Config | null>();
  const remainingTime = useSignal<number | null>(null);

  useVisibleTask$(async () => {
    const { data } = await supabaseClient
      .from("config")
      .select("*")
      .eq("id", 1);

    if (data) {
      config.value = data[0];
      //   updateRemainingTime();
      //   setInterval(updateRemainingTime, 1000); // Update every second
    }
  });

  const updateRemainingTime = () => {
    if (config.value?.planned_end) {
      const now = DateTime.now();
      const later = DateTime.fromISO(config.value.planned_end);

      const diff = later.diff(now, ["hours", "minutes", "seconds"]).toObject();
      return `- ${diff.hours} ${Math.round(Number(diff.minutes))}'`;
      // return Math.round(Number(diff.seconds));
    }

    return "";
  };

  return (
    <div class={styles.endGameContainer}>
      {config.value?.games_started_at ? (
        <>
          <div class={styles.header}>
            <div class={styles.title}>Fine gioco</div>
            <div class={styles.plannedEnd}>h 19:00</div>
          </div>
          <div class={styles.remainingTime}>{updateRemainingTime()}</div>
        </>
      ) : (
        <>
          <div>Inizio giochi</div>
          <div>17:00</div>
        </>
      )}
    </div>
  );
});
