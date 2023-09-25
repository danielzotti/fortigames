import { component$ } from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import GameResults from "~/shared/components/games-results/game-results";

export default component$(() => {
  return (
    <MainLayout>
        <h1>Games</h1>
        <GameResults editMode={true} />
    </MainLayout>
  );
});
