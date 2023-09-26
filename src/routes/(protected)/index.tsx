import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { supabaseClient } from "~/supabase/supabase-client";
import { Participant } from "~/types/participant.types";

import GameResults from "~/shared/components/games-results/game-results";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import GamesTimeManager from "~/shared/components/games-time-manager/games-time-manager";
import GamesTeam from "~/shared/components/games-team/games-team";

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
      {/*<div q:slot="title">Welcome to Fortigames 2023</div>*/}
      <GameResults />
      <GamesTimeManager />
      <GamesTeam />
      <p>
        FontAwesome Test:
        <i class="fa-solid fa-user"></i>
        <i class="fa-brands fa-github-square"></i>
      </p>
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
