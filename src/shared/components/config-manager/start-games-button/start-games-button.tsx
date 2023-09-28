import { $, component$ } from "@builder.io/qwik";
import Button from "~/shared/components/ui/button/button";
import { supabaseClient } from "~/supabase/supabase-client";
import { useConfig } from "~/hooks/useConfig";

interface Props {
  restart?: boolean;
}

export default component$(({ restart = false }: Props) => {
  const { isGamesStarted, isGamesPaused } = useConfig();
  const startGames = $(async () => {
    await supabaseClient
      .from("config")
      .update({
        ...(!isGamesPaused.value && {
          games_started_at: new Date().toISOString(),
        }),
        ...(isGamesPaused.value && { is_paused: false }),
        games_ended_at: null,
      })
      .eq("id", 1);
  });

  return (
    <Button onClick$={startGames}>
      <i class="fa fa-play"></i>
      {restart ? "Riprendi i giochi" : "Inizia i giochi"}
    </Button>
  );
});
