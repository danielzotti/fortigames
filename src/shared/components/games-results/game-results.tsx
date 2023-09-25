import {component$, useStore, useVisibleTask$} from "@builder.io/qwik";
import styles from "./game-results.module.scss";
import { supabaseClient } from "~/supabase/supabase-client";
import { config, Games } from "~/config";
import {Link} from "@builder.io/qwik-city";

interface Props {
    editMode?: boolean
}

interface Results {
    volley: {
        dragons: number,
        tigers: number
    },
    soccer: {
        dragons: number,
        tigers: number
    },
    table_tennis: {
        dragons: number,
        tigers: number
    }
}

export default component$(({ editMode }: Props) => {
    const results = useStore<Results>({
        volley: {
            dragons: 0,
            tigers: 0
        },
        soccer: {
            dragons: 0,
            tigers: 0
        },
        table_tennis: {
            dragons: 0,
            tigers: 0
        }
    });

    useVisibleTask$(async () => {
        const { data } = await supabaseClient
            .from("games_results")
            .select("*")

        data?.forEach((row) => {
            results[row.name as keyof Results].dragons = row.dragons;
            results[row.name as keyof Results].tigers = row.tigers;
        });

        supabaseClient.channel('custom-update-channel')
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'games_results' },
                (payload) => {
                    results[payload.new.name as keyof Results].dragons = payload.new.dragons;
                    results[payload.new.name as keyof Results].tigers = payload.new.tigers;
                    console.log(payload.new)
                }
            )
            .subscribe()
    });

  return (
    <div class={styles.resultContainer}>
        {Object.keys(results).map(k => (
            <div key={k}>
                <div class={styles.result}>
                    <i class={[config.games[k as keyof Games].icon, styles.resultIcon]}></i>
                    <span class={styles.resultInfo}>{results[k as keyof Results].dragons} - {results[k as keyof Results].tigers}</span>
                    <span class={styles.resultLabel}>{config.games[k as keyof Games].label}</span>
                </div>
                {editMode && (
                    <div class={styles.manage}>
                        <Link href={"/games/" + k}>
                            Arbitra
                        </Link>
                    </div>

                )}
            </div>
        ))}
    </div>
  );
});
