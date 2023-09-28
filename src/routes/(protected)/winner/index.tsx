import { component$, useSignal } from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import styles from "./index.module.scss";
import BackTopButton from "~/shared/components/ui/back-top-button/back-top-button";
import TeamBadge from "~/shared/components/ui/team-badge/team-badge";

import Trophy from "../../../../public/static/images/trophy.png?jsx";

export default component$(() => {
  const containerRef = useSignal<HTMLElement>();

  return (
    <MainLayout title="Il trofeo" ref={containerRef}>
      <div class={styles.trophy}>
        <span class={styles.label}>Stay tuned</span>
        <div class={styles.winner}>
          <Trophy class={styles.trophyImg} />
          <div class={styles.teamWinner}>Dragons</div>
          <div class={styles.teamBadge}>
            <TeamBadge />
          </div>
        </div>
        <div class={styles.hexagon} />
      </div>
      <span>Congratulazioni!!!</span>
    </MainLayout>
  );
});
