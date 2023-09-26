import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./games-team.module.scss";
import { useAuth } from "~/hooks/useAuth";
import { supabaseClient } from "~/supabase/supabase-client";

export default component$(() => {
  const { auth } = useAuth();
  const team = useSignal<string | null>(null);

  useVisibleTask$(async () => {
    if (auth.value?.user.email) {
      const { data } = await supabaseClient
        .from("users")
        .select("team")
        .eq("email", auth.value.user.email);

      if (data) {
        team.value = data[0].team;
      }
    }
  });

  return <div class={styles.endGameContainer}>{team}</div>;
});
