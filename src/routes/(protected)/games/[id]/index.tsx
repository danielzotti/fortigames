import {
  $,
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import { useLocation } from "@builder.io/qwik-city";
import { supabaseClient } from "~/supabase/supabase-client";
import GameResults from "~/shared/components/games-results/game-results";
import styles from "./index.module.scss";
import Button from "~/shared/components/ui/button/button";
import { config } from "~/config";
import BackButton from "~/shared/components/ui/back-button/back-button";

interface GameResults {
  dragons: number;
  id: number;
  last_update: string | null;
  name: string | null;
  tigers: number;
}

export default component$(() => {
  const location = useLocation();
  const game = useSignal(location.params.id);
  const results = useStore<GameResults>({
    dragons: 0,
    id: 0,
    last_update: null,
    name: "",
    tigers: 0,
  });

  useVisibleTask$(async () => {
    const { data } = await supabaseClient
      .from("games_results")
      .select("*")
      .eq("name", game.value);

    const newValue = data?.[0];
    for (const key in newValue) {
      if (key in newValue) {
        // @ts-ignore
        results[key] = newValue[key];
      }
    }
  });

  const updateScore = $(async () => {
    results.last_update = new Date().toISOString();
    const { data, error } = await supabaseClient
      .from("games_results")
      .update({
        dragons: results.dragons,
        tigers: results.tigers,
        last_update: results.last_update,
      })
      .eq("name", game.value);
  });

  return (
    <MainLayout
      title={config.games[game.value as keyof typeof config.games].label}
    >
      <BackButton url={config.urls.games} />
      <h2 class={styles.title}>Arbitraggio</h2>
      <div class={styles.teamContainer}>
        <div class={styles.singleTeam}>
          Tigers
          <div class={styles.singleTeamResult}>{results.tigers}</div>
          <Button
            onClick$={[
              $(() => {
                results.tigers--;
              }),
              updateScore,
            ]}
          >
            -
          </Button>
          <Button
            onClick$={[
              $(() => {
                results.tigers++;
              }),
              updateScore,
            ]}
          >
            +
          </Button>
        </div>

        <div class={styles.singleTeam}>
          Dragons
          <div class={styles.singleTeamResult}>{results.dragons}</div>
          <Button
            onClick$={[
              $(() => {
                results.dragons--;
              }),
              updateScore,
            ]}
          >
            -
          </Button>
          <Button
            onClick$={[
              $(() => {
                results.dragons++;
              }),
              updateScore,
            ]}
          >
            +
          </Button>
        </div>
      </div>
    </MainLayout>
  );
});
