import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { $ } from "@builder.io/qwik";
import styles from "./games-time-manager.module.scss";
import { supabaseClient } from "~/supabase/supabase-client";
import { DateTime } from "luxon";
import Trophy from "~/shared/components/ui/Trophy/trophy";
import LabelLive from "~/shared/components/ui/label-live/label-live";

interface Config {
  id: number;
  games_started_at?: string | null;
  games_ended_at?: string | null;
  planned_start: string | null;
  planned_end: string | null;
}

export default component$(() => {
  const config = useSignal<Config | null>();
  const remainingTime = useSignal<string | null>(null);
  const time = useSignal("17:30")

  const updateRemainingTime = $(() => {
    const now = DateTime.now();
    const later = DateTime.fromISO((config.value?.games_started_at ? config.value?.planned_end : config.value?.planned_start) || "");
    time.value = later.hour + ":" + later.minute;

    const diff = later.diff(now, ["hours", "minutes", "seconds"]).toObject();
    remainingTime.value = `-${diff.hours}h ${String(diff.minutes).padStart(2, "0")}´`; // ${Math.round(Number(diff.seconds)

    return "";
  });

  useVisibleTask$(async () => {
    const { data } = await supabaseClient
      .from("config")
      .select("*")
      .eq("id", 1);

    if (data) {
      config.value = data[0];
      setInterval(updateRemainingTime, 1000);
    }
  });

  return (
    <div class={styles.endGameContainer}>
      <Trophy />
      <div class={styles.timerContainer}>
        <div class={styles.header}>
          <LabelLive text={config.value?.games_started_at ? "Fine giochi" : "Inizio giochi"} />
          <div class={config.value?.games_started_at ? styles.plannedEnd : styles.plannedStart}>h {time.value}</div>
        </div>
        <div class={styles.remainingTime}>{remainingTime.value || "..."}</div>
      </div>
    </div>
  );
});
