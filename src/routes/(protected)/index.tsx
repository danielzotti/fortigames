import {
  component$,
  useContext
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import GameResults from "~/shared/components/games-results/game-results";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import GamesTimeManager from "~/shared/components/games-time-manager/games-time-manager";
import EventProgram from "~/shared/components/event-program/event-program";
import { ThemeContext } from "~/contexts/theme.context";
import LocationMap from "~/shared/components/ui/location-map/location-map";
import TeamsSlider from "~/shared/components/teams-slider/teams-slider";

export default component$(() => {
  const theme = useContext(ThemeContext);

  return (
    <MainLayout title="Home" hasContentPaddingTop={false}>
        <TeamsSlider>
            <GameResults />
        </TeamsSlider>
      <GamesTimeManager />
      {/*<GamesTeam />*/}
      <EventProgram />

      {/*<button
        onClick$={() =>
          (theme.value = theme.value == "dark" ? "light" : "dark")
        }
      >
        Toggle theme
      </button>*/}

      <LocationMap />
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
