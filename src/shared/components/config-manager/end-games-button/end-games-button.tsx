import { $, component$ } from "@builder.io/qwik";
import Button from "~/shared/components/ui/button/button";
import { supabaseClient } from "~/supabase/supabase-client";

export default component$(() => {
  const endGames = $(async () => {
    const isConfirm = window.confirm(
      "Sei sicuro di voler terminare i giochi???",
    );

    if (!isConfirm) {
      return;
    }
    const { data, error } = await supabaseClient
      .from("config")
      .update({
        games_ended_at: new Date().toISOString(),
        is_paused: false,
      })
      .eq("id", 1);
  });

  return (
    <Button onClick$={endGames} variant="default">
      <i class="fa fa-flag"></i>  &nbsp; 
      {"Termina il torneo"}
    </Button>
  );
});
