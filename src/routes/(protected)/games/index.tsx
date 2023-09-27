import { component$ } from "@builder.io/qwik";
import GameResults from "~/shared/components/games-results/game-results";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import { useAuth } from "~/hooks/useAuth";

export default component$(() => {
  const { isReferee, isFacilitator, isAdmin } = useAuth();

  return (
    <MainLayout title="Fortigames">
      <GameResults editMode={isAdmin || isReferee || isFacilitator} />
    </MainLayout>
  );
});
