import { $, component$ } from "@builder.io/qwik";
import Button from "~/shared/components/ui/button/button";
import { supabaseClient } from "~/supabase/supabase-client";

interface Props {
  reset?: boolean;
}

export default component$(({ reset = false }: Props) => {
  const endGames = $(async () => {
    const { data, error } = await supabaseClient
      .from("config")
      .update({
        games_ended_at: reset ? null : new Date().toISOString(),
      })
      .eq("id", 1);
    console.log("END", { data, error });
  });

  return (
    <Button onClick$={endGames}>
      <i class="fa fa-flag"></i>{" "}
      {reset ? "Reset fine giochi" : "Termina i giochi"}
    </Button>
  );
});
