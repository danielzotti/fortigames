import { $, component$ } from "@builder.io/qwik";
import Button from "~/shared/components/ui/button/button";
import { supabaseClient } from "~/supabase/supabase-client";

export default component$(() => {
  const endGames = $(async () => {
    const { data, error } = await supabaseClient
      .from("config")
      .update({
        games_ended_at: new Date().toISOString(),
        is_paused: false,
      })
      .eq("id", 1);
  });

  return (
    <Button onClick$={endGames}>
      <i class="fa fa-flag"></i> {"Termina i giochi"}
    </Button>
  );
});
