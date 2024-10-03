import { component$, useComputed$ } from "@builder.io/qwik";
import GameResults from "~/shared/components/games-results/game-results";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import { useAuth } from "~/hooks/useAuth";
import styles from "./index.module.scss";
import StartGamesButton from "~/shared/components/config-manager/start-games-button/start-games-button";
import EndGamesButton from "~/shared/components/config-manager/end-games-button/end-games-button";
import { useConfig } from "~/hooks/useConfig";
import PauseGamesButton from "~/shared/components/config-manager/pause-games-button/pause-games-button";

export default component$(() => {
  const { isGamesStarted, isGamesPaused, isGamesWaiting, isGamesEnded } =
    useConfig();
  const { isReferee, isFacilitator, isAdmin } = useAuth();

  return (
    <MainLayout title="Fortigames">
      <GameResults editMode={isAdmin || isReferee || isFacilitator} />
      {isAdmin && (
        <div class={styles.manage}>
          {isGamesWaiting.value && <StartGamesButton />}
          {isGamesPaused.value && <StartGamesButton restart={true} />}
          {isGamesStarted.value && <PauseGamesButton />}
          {isGamesStarted.value && <EndGamesButton />}
          {isGamesEnded.value && (
            <>
              <p>Il torneo è terminato</p>
              <StartGamesButton />
            </>
          )}
        </div>
      )}
    </MainLayout>
  );
});
