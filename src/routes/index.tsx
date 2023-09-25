import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { supabaseClient } from "~/supabase/supabase-client";
import { Participant } from "~/types/participant.types";

import MainLayout from "~/shared/layouts/main-layout/main-layout";
import GameResults from "~/shared/components/games-results/game-results";

export default component$(() => {
  const people = useSignal<Array<Participant> | null>();

  useVisibleTask$(async () => {
    const { data: participantList } = await supabaseClient
      .from("users")
      .select("*");

    people.value = participantList;
  });

  return (
    <MainLayout>
      <h1>Welcome to Fortigames 2023</h1>
      <GameResults />

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
