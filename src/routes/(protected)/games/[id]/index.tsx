import {
  $,
  component$,
  PropFunction,
  QRL,
  Signal,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import { useLocation } from "@builder.io/qwik-city";
import { supabaseClient } from "~/supabase/supabase-client";
import styles from "./index.module.scss";
import Button from "~/shared/components/ui/button/button";
import { config } from "~/config";
import BackButton from "~/shared/components/ui/back-button/back-button";
import { useGamesResults } from "~/hooks/useGameResults";
import { GameResult, GamesResults, SportGames } from "~/types/games.types";
import Loader from "~/shared/components/ui/loader/loader";
import { TeamsValues } from "~/types/teams.types";

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
  const { results, resultsByGame } = useGamesResults();
  const result = useSignal<GameResult>();
  const isSubmitting = useSignal<boolean>(false);

  useVisibleTask$(async () => {
    result.value = await resultsByGame(game.value as SportGames);
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
          <p>Arbitraggio </p>
          <h2 class={styles.title}>
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
