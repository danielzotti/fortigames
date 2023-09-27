import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { supabaseClient } from "~/supabase/supabase-client";
import { Participant } from "~/types/participant.types";

import GameResults from "~/shared/components/games-results/game-results";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import GamesTimeManager from "~/shared/components/games-time-manager/games-time-manager";
import GamesTeam from "~/shared/components/games-team/games-team";
import EventProgram from "~/shared/components/event-program/event-program";
import { Link } from "@builder.io/qwik-city";
import { config } from "~/config";

export default component$(() => {
  const people = useSignal<Array<Participant> | null>();

  useVisibleTask$(async () => {
    const { data: participantList } = await supabaseClient
      .from("users")
      .select("*");

    people.value = participantList;
  });

  return (
    <MainLayout title="Home">
      <GameResults />
      <GamesTimeManager />
      <GamesTeam />
      <EventProgram />
      <div>
        <Link href={`${config.urls.info}#agenda`}>Programma</Link>
      </div>
      <a href="https://maps.app.goo.gl/T23BwGW6LLdEnC5Y8" target="_blank">
        Location
      </a>
    </MainLayout>
  );
});

export const head: DocumentHead = {
  title: "Fortigames 2023 title",
  meta: [
    {
      name: "description",
      content: "Fortigames 2023 description",
    },
  ],
};
