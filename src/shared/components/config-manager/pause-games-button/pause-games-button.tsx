import { $, component$ } from "@builder.io/qwik";
import Button from "~/shared/components/ui/button/button";
import { supabaseClient } from "~/supabase/supabase-client";

export default component$(() => {
  const pauseGames = $(async () => {
    const { data, error } = await supabaseClient
      .from("config")
      .update({
        is_paused: true,
      })
      .eq("id", 1);
  });

  return (
    <Button onClick$={pauseGames}>
      <i class="fa fa-pause"></i>  &nbsp; 
      Metti in pausa il torneo
    </Button>
  );
});
