import { $, component$ } from "@builder.io/qwik";
import Button from "~/shared/components/ui/button/button";
import { supabaseClient } from "~/supabase/supabase-client";

export default component$(() => {
  const stopGames = $(async () => {
    const { data, error } = await supabaseClient
      .from("config")
      .update({
        games_started_at: null,
        games_ended_at: null,
      })
      .eq("id", 1);
    console.log("STOP", { data, error });
  });

  return (
    <Button onClick$={stopGames}>
      <i class="fa fa-pause"></i> Ferma i giochi
    </Button>
  );
});
