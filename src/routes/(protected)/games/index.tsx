import { component$ } from "@builder.io/qwik";
import GameResults from "~/shared/components/games-results/game-results";
import MainLayout from "~/shared/layouts/main-layout/main-layout";

export default component$(() => {
  return (
    <MainLayout title="Fortigames">
      <GameResults editMode={true} />
    </MainLayout>
  );
});
