import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { supabaseClient } from "~/supabase/supabase-client";
import { Participant } from "~/types/participant.types";

export default component$(() => {
  const people = useSignal<Array<Participant> | null>();

  useVisibleTask$(async () => {
    const { data: participantList } = await supabaseClient
      .from("users")
      .select("*");

    people.value = participantList;
  });

  return (
    <>
      <h1>Teams</h1>
      <div>White / Black</div>
      <div>
        {people.value &&
          people.value.map((p) => (
            <div key={p.id}>
              {p.firstname} {p.lastname} {p.number} ({p.company})
              {p.has_filled_form ? "X" : ""}
              {p.is_playing_soccer ? "X" : ""}
              {p.is_playing_volley ? "X" : ""}
              {p.is_playing_pingpong ? "X" : ""}
              {p.is_playing_boardgames ? "X" : ""}
              {p.is_referee ? "X" : ""}
              {p.is_facilitator ? "X" : ""}
            </div>
          ))}
      </div>
    </>
  );
});
