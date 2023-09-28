import {
  component$,
  useComputed$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { $ } from "@builder.io/qwik";
import styles from "./games-time-manager.module.scss";
import { supabaseClient } from "~/supabase/supabase-client";
import { DateTime } from "luxon";
import LabelLive from "~/shared/components/ui/label-live/label-live";
import Trophy from "../../../../public/static/images/trophy.png?jsx";
import { useConfig } from "~/hooks/useConfig";

interface Config {
  id: number;
  games_started_at?: string | null;
  games_ended_at?: string | null;
  planned_start: string | null;
  planned_end: string | null;
}

export default component$(() => {
  // const config = useSignal<Config | null>();
  const { config, isGamesEnded, isGamesStarted, countdownDate } = useConfig();
  const remainingTime = useSignal<string | null>(null);
  const time = useSignal<string | undefined>();

  const updateRemainingTime = $(() => {
    const now = DateTime.now();
    const later = DateTime.fromISO(countdownDate.value || "");
    time.value = later.hour + ":" + later.minute;

    const diff = later.diff(now, ["hours", "minutes", "seconds"]).toObject();
    remainingTime.value = `-${diff.hours}h ${String(diff.minutes).padStart(
      2,
      "0",
    )}m ${diff.seconds?.toFixed(0).padStart(2, "0")}s`; // ${Math.round(Number(diff.seconds)

    return "";
  });

  useVisibleTask$(async () => {
    setInterval(updateRemainingTime, 1000);
  });

  return (
    <div class={styles.endGameContainer}>
      <Trophy />
      <div class={styles.timerContainer}>
        {time.value && (
          <div class={styles.header}>
            <LabelLive
              text={config.games_started_at ? "Fine giochi" : "Inizio giochi"}
            />
            <div
              class={
                config.games_started_at
                  ? styles.plannedEnd
                  : styles.plannedStart
              }
            >
              h {time.value}
            </div>
          </div>
        )}

        <div class={styles.remainingTime}>{remainingTime.value || "..."}</div>
      </div>
    </div>
  );
});
