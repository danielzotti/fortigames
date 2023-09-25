import { component$ } from "@builder.io/qwik";
import styles from "./game-results.module.scss";
import { supabaseClient } from "~/supabase/supabase-client";
interface Props {
}

export default component$(({  }: Props) => {
const gamesResults = supabaseClient.channel('custom-update-channel')
    .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'games_results' },
        (payload) => {
            console.log('Change received!', payload)
        }
    )
    .subscribe()
  return (
    <div>
        <div class={styles.result}>
            Calcio
        </div>
        <div class={styles.result}>
            Volley
        </div>
        <div class={styles.result}>
            Tennis tavolo
        </div>
    </div>
  );
});
