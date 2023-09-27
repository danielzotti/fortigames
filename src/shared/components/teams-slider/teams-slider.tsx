import { Slot, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./teams-slider.module.scss";

export default component$(() => {
  return (
    <div class={styles.teamsSliderContainer}>
      <div class={styles.teamsBgContainer}>
        <div class={[styles.teamCover, styles.tigers]}></div>
        <div class={[styles.teamCover, styles.dragons]}></div>
      </div>
      <div class={styles.slotContainer}>
        <div class={[styles.teamInfoContainer, styles.tigers]}>
          <div class={styles.teamTitle}>Tigers</div>
        </div>
        <div class={[styles.teamInfoContainer, styles.dragons]}>
          <div class={styles.teamTitle}>Dragons</div>
        </div>
        <div class={styles.slot}>
          <Slot></Slot>
        </div>
      </div>
    </div>
  );
});
