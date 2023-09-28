import { component$, useSignal } from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import styles from "./index.module.scss";
import TeamBadge from "~/shared/components/ui/team-badge/team-badge";
import Trophy from "../../../../public/static/images/trophy.png?jsx";
import { config } from "~/config";
import { useConfig } from "~/hooks/useConfig";

export default component$(() => {
  const { winner } = useConfig();

  return (
    <MainLayout title="Il trofeo">
      <div class={styles.trophy}>
        <span class={styles.text}>
          {!winner.value ? "Stay tuned" : "E la coppa va a..."}
        </span>
        <div class={styles.winner}>
          <div class={styles.trophyImgContainer}>
            <Trophy class={styles.trophyImg} />
          </div>
          {!!winner.value && (
            <>
              <div class={styles.teamWinner}>
                <div class={[styles.label, styles[winner.value]]}>
                  {
                    config.teams[
                      winner.value as unknown as keyof typeof config.teams
                    ].label
                  }
                </div>
              </div>
              <div class={styles.teamBadge}>
                <TeamBadge team={winner.value} />
              </div>
              <div class={styles.text}>Congratulazioni!!!</div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
});
