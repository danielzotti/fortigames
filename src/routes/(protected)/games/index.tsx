import { component$ } from "@builder.io/qwik";
import GameResults from "~/shared/components/games-results/game-results";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import { useAuth } from "~/hooks/useAuth";
import styles from "./index.module.scss";
import Button from "~/shared/components/ui/button/button";
import StartGamesButton from "~/shared/components/config-manager/start-games-button/start-games-button";
import StopGamesButton from "~/shared/components/config-manager/stop-games-button/stop-games-button";
import EndGamesButton from "~/shared/components/config-manager/end-games-button/end-games-button";
import { useConfig } from "~/hooks/useConfig";

export default component$(() => {
  const { isGamesStarted, isGamesWaiting, isGamesEnded } = useConfig();
  const { isReferee, isFacilitator, isAdmin } = useAuth();

  return (
    <MainLayout title="Fortigames">
      <GameResults editMode={isAdmin || isReferee || isFacilitator} />
      {isAdmin && (
        <div class={styles.manage}>
          {isGamesWaiting && <StartGamesButton />}
          {isGamesStarted && <StopGamesButton />}
          {isGamesStarted && <EndGamesButton />}

          <div class={styles.winner}>
            <h2>TODO</h2>
            <input />
            <Button>Decreta il vincitore dei giochi!</Button>
          </div>
        </div>
      )}
    </MainLayout>
  );
});
