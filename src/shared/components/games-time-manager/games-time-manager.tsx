import {
  component$,
  useComputed$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { $ } from "@builder.io/qwik";
import styles from "./games-time-manager.module.scss";
import { DateTime } from "luxon";
import LabelLive from "~/shared/components/ui/label-live/label-live";
import Trophy from "../../../../public/static/images/trophy.png?jsx";
import { useConfig } from "~/hooks/useConfig";

export default component$(() => {
  const {
    isGamesPaused,
    isGamesWaiting,
    isGamesEnded,
    isGamesStarted,
    countdownDate,
  } = useConfig();
  const remainingTime = useSignal<string | null>(null);
  const time = useSignal<string | undefined>();

  const labelLive = useComputed$(() => {
    if (isGamesEnded.value) {
      return "Giochi finiti!";
    }
    if (isGamesWaiting.value) {
      return "Pianificato";
    }
    if (isGamesStarted.value) {
      return "In corso";
    }
    if (isGamesPaused.value) {
      return "In pausa";
    }

    return "";
  });

  const updateRemainingTime = $(() => {
    const now = DateTime.now();
    const deadline = DateTime.fromISO(countdownDate.value || "");
    time.value = deadline.hour + ":" + deadline.minute;

    if (isGamesEnded.value) {
      remainingTime.value = "Terminato";
      return;
    }

    if (now > deadline) {
      remainingTime.value = "...";
      return;
    }

    const diff = deadline.diff(now, ["hours", "minutes", "seconds"]).toObject();

    remainingTime.value = `-${
      diff.hours! !== 0 ? diff.hours + "h " : ""
    }${String(Math.abs(diff.minutes!)).padStart(2, "0")}m ${
      diff.hours !== 0
        ? ""
        : Math.abs(diff.seconds!)?.toFixed(0).padStart(2, "0") + "s"
    }`;
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
            {!!labelLive && <LabelLive text={labelLive.value} />}
            <div
              class={
                isGamesStarted.value ? styles.plannedEnd : styles.plannedStart
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
