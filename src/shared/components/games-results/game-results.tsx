import {
  component$,
  useContext,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import styles from "./game-results.module.scss";
import { supabaseClient } from "~/supabase/supabase-client";
import { config } from "~/config";
import { Link } from "@builder.io/qwik-city";
import { Games, GamesResults } from "~/types/games.types";
import { gamesResultsDefault, useGamesResults } from "~/hooks/useGameResults";
import Loader from "~/shared/components/ui/loader/loader";
import { GamesResultsContext } from "~/contexts/games-results.context";

interface Props {
  editMode?: boolean;
}

export default component$(({ editMode }: Props) => {
  const { results } = useGamesResults();

  if (!results) {
    return <Loader />;
  }

  return (
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
          {editMode && (
            <div class={styles.manage}>
              <Link href={"/games/" + k}>Arbitra</Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
});
