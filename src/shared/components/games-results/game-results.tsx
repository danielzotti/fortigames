import { component$ } from "@builder.io/qwik";
import styles from "./game-results.module.scss";
import { config } from "~/config";
import { Games, GamesResults } from "~/types/games.types";
import { useGamesResults } from "~/hooks/useGameResults";
import Loader from "~/shared/components/ui/loader/loader";
import Button from "~/shared/components/ui/button/button";
import { useConfig } from "~/hooks/useConfig";
import { useAuth } from "~/hooks/useAuth";

interface Props {
  editMode?: boolean;
}

export default component$(({ editMode }: Props) => {
  const { isAdmin } = useAuth();
  const { isGamesStarted } = useConfig();
  const { results } = useGamesResults();

  return (
    <>
      <div class={styles.resultContainer}>
        {Object.keys(results).map((k) => (
          <div key={k}>
            <div class={styles.result}>
              <span class={styles.resultIcon}>
                <i class={[config.games[k as keyof Games].icon]}></i>
              </span>
              <span class={styles.resultInfo}>
                <span class={styles.tigers}>
                  {results[k as keyof GamesResults].tigers}
                </span>
                <span class={styles.dragons}>
                  {results[k as keyof GamesResults].dragons}
                </span>
              </span>
              <span class={styles.resultLabel}>
                {config.games[k as keyof Games].label}
              </span>
            </div>
            {editMode && (isGamesStarted.value || isAdmin) && (
              <div class={styles.manage}>
                <Button isLink={true} href={`${config.urls.games}/${k}`}>
                  Arbitra
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
});
