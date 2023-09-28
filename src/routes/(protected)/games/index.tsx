import { component$ } from "@builder.io/qwik";
import GameResults from "~/shared/components/games-results/game-results";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import { useAuth } from "~/hooks/useAuth";
import styles from "./index.module.scss";
import Button from "~/shared/components/ui/button/button";

export default component$(() => {
  const { isReferee, isFacilitator, isAdmin } = useAuth();

  return (
    <MainLayout title="Fortigames">
      <GameResults editMode={isAdmin || isReferee || isFacilitator} />
      {isAdmin && (
        <div class={styles.manage}>
          <h2>TODO</h2>
          <Button>Inizia i giochi!</Button>
          <Button>Concludi i giochi!</Button>
          <div>
            <input />
            <Button>Decreta il vincitore dei giochi!</Button>
          </div>
        </div>
      )}
    </MainLayout>
  );
});
