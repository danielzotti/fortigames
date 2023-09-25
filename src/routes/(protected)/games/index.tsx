import { component$ } from "@builder.io/qwik";
import GameResults from "~/shared/components/games-results/game-results";

export default component$(() => {
  return (
    <>
        <GameResults editMode={true} />
    </>
  );
});
