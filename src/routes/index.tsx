import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { supabaseClient } from "~/supabase/supabase-client";
import { Participant } from "~/types/participant.types";

import MainLayout from "~/shared/layouts/main-layout/main-layout";

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

      <p>
        FontAwesome Test:
        <i class="fa-solid fa-user"></i>
        <i class="fa-brands fa-github-square"></i>
      </p>

      {people.value && (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>N.</th>
              <th>Team</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Form</th>
              <th>Soccer</th>
              <th>Volley</th>
              <th>Ping Pong</th>
              <th>Board Games</th>
              <th>Referee</th>
              <th>Facilitator</th>
            </tr>
          </thead>
          <tbody>
            {people.value.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.number}</td>
                <td>{p.team}</td>
                <td>{p.firstname}</td>
                <td>{p.lastname}</td>
                <td>{p.email}</td>
                <td>{p.company}</td>
                <td>{p.has_filled_form ? "X" : ""}</td>
                <td>{p.is_playing_soccer ? "X" : ""}</td>
                <td>{p.is_playing_volley ? "X" : ""}</td>
                <td>{p.is_playing_pingpong ? "X" : ""}</td>
                <td>{p.is_playing_boardgames ? "X" : ""}</td>
                <td>{p.is_referee ? "X" : ""}</td>
                <td>{p.is_facilitator ? "X" : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
