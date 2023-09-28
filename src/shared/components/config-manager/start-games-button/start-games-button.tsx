import { $, component$ } from "@builder.io/qwik";
import Button from "~/shared/components/ui/button/button";
import { supabaseClient } from "~/supabase/supabase-client";

export default component$(() => {
  const startGames = $(async () => {
    const { data, error } = await supabaseClient
      .from("config")
      .update({
        games_started_at: new Date().toISOString(),
        games_ended_at: null,
      })
      .eq("id", 1);
  });

  return (
    <Button onClick$={startGames}>
      <i class="fa fa-play"></i>Inizia i giochi
    </Button>
  );
});
