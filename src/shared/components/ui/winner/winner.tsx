import styles from "~/routes/(protected)/winner/index.module.scss";
import { config } from "~/config";
import TeamBadge from "~/shared/components/ui/team-badge/team-badge";
import { component$ } from "@builder.io/qwik";
import { useConfig } from "~/hooks/useConfig";
import Trophy from "../../../../../public/static/images/trophy.png?jsx";

export default component$(() => {
  const { winner } = useConfig();
  return (
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
  );
});
