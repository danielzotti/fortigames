import {
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import GameResults from "~/shared/components/games-results/game-results";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import GamesTimeManager from "~/shared/components/games-time-manager/games-time-manager";
import GamesTeam from "~/shared/components/games-team/games-team";
import EventProgram from "~/shared/components/event-program/event-program";
import Map from "~/shared/components/ui/map/map";
import { ThemeContext } from "~/contexts/theme.context";

export default component$(() => {
  const theme = useContext(ThemeContext);

  return (
    <MainLayout title="Home" hasContentPaddingInline={false}>
      <GameResults />
      <GamesTimeManager />
      <GamesTeam />
      <EventProgram />

      <button
        onClick$={() =>
          (theme.value = theme.value == "dark" ? "light" : "dark")
        }
      >
        Toggle theme
      </button>

      <Map />
    </MainLayout>
  );
});

export const head: DocumentHead = {
  title: "Fortigames 2023",
  meta: [
    {
      name: "description",
      content:
        "L'app NON ufficiale della convention del gruppo Fortitude sul lago di Garda!",
    },
  ],
};
