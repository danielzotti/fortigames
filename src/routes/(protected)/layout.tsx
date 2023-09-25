import { component$, Slot } from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import GameResults from "~/shared/components/games-results/game-results";

export default component$(() => {
  return (
    <MainLayout>
      <Slot />
    </MainLayout>
  );
});
