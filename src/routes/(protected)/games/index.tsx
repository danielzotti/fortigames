import { component$ } from "@builder.io/qwik";
import GameResults from "~/shared/components/games-results/game-results";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import {useAuth} from "~/hooks/useAuth";

export default component$(() => {
    const { auth } = useAuth();

  return (
    <MainLayout title="Fortigames">
      <GameResults editMode={auth.value?.is_admin || auth.value?.is_referee} />
    </MainLayout>
  );
});
