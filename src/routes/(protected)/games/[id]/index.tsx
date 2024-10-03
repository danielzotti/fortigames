import {
  $,
  component$,
  PropFunction,
  Signal,
  useComputed$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { config } from "~/config";
import { useGamesResults } from "~/hooks/useGameResults";
import BackButton from "~/shared/components/ui/back-button/back-button";
import Button from "~/shared/components/ui/button/button";
import Loader from "~/shared/components/ui/loader/loader";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import { supabaseClient } from "~/supabase/supabase-client";
import { GameResult, SportGames } from "~/types/games.types";
import { TeamsValues } from "~/types/teams.types";
import styles from "./index.module.scss";

interface SingleItemProps {
  team: TeamsValues;
  updateScore: PropFunction<
    (result: { team: TeamsValues; score: number }) => void
  >;
  result: Signal<GameResult | undefined>;
  disabled: boolean;
}

const SingleItem = component$(
  ({ team, updateScore, result, disabled }: SingleItemProps) => {
    if (!result.value) {
      return <Loader />;
    }

    return (
      <div class={styles.singleTeam}>
        <h3>{config.teams[team].label}</h3>
        <div class={styles.singleTeamResult}>{result.value[team]}</div>
        <Button
          disabled={disabled}
          onClick$={() =>
            updateScore({
              team,
              score: result.value![team] - 1,
            })
          }
        >
          -
        </Button>
        <Button
          variant="selected"
          disabled={disabled}
          onClick$={() =>
            updateScore({
              team,
              score: result.value![team] + 1,
            })
          }
        >
          +
        </Button>
      </div>
    );
  },
);

export default component$(() => {
  const location = useLocation();
  const game = useSignal(location.params.id);
  const { results } = useGamesResults();
  const result = useSignal<GameResult>();
  const isSubmitting = useSignal<boolean>(false);

  const computed = useComputed$(() => {
    return results[game.value as SportGames];
  });

  useVisibleTask$(async () => {
    result.value = computed.value;
  });

  const updateScore = $(
    async ({ team, score }: { team: TeamsValues; score: number }) => {
      if (!result.value) {
        return;
      }
      if (score < 0) {
        return;
      }

      isSubmitting.value = true;
      try {
        const row = {
          ...result.value,
          last_update: new Date().toISOString(),
          [team]: score,
        };
        const { data, error } = await supabaseClient
          .from("games_results")
          .update(row)
          .eq("name", game.value);
        if (!error) {
          result.value = row;
        }
      } catch (ex) {
        alert("C'è stato un errore :( Riprova!");
      } finally {
        isSubmitting.value = false;
      }
    },
  );

  return (
    <MainLayout
      title={config.games[game.value as keyof typeof config.games].label}
    >
      {(!game.value || !result.value) && <Loader />}
      {game.value && result.value && (
        <>
          <BackButton url={config.urls.games} />
          <h2 class={styles.title}>
            Arbitraggio{" "}
            {config.games[game.value as keyof typeof config.games].label}
          </h2>

          <div class={styles.teamContainer}>
            <SingleItem
              team={"tigers"}
              disabled={isSubmitting.value}
              result={result}
              updateScore={updateScore}
            />
            <SingleItem
              team={"dragons"}
              disabled={isSubmitting.value}
              result={result}
              updateScore={updateScore}
            />
          </div>
        </>
      )}
    </MainLayout>
  );
});
