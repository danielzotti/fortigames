import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./game-results.module.scss";
import { supabaseClient } from "~/supabase/supabase-client";
import { config, Games } from "~/config";
import { Link } from "@builder.io/qwik-city";

interface Props {
  editMode?: boolean;
}

interface Results {
  volley: {
    tigers: number;
    dragons: number;
  };
  soccer: {
    tigers: number;
    dragons: number;
  };
  table_tennis: {
    tigers: number;
    dragons: number;
  };
}

export default component$(({ editMode }: Props) => {
  const results = useStore<Results>({
    volley: {
      tigers: 0,
      dragons: 0,
    },
    soccer: {
      tigers: 0,
      dragons: 0,
    },
    table_tennis: {
      tigers: 0,
      dragons: 0,
    },
  });

  useVisibleTask$(async () => {
    const { data } = await supabaseClient.from("games_results").select("*");

    data?.forEach((row) => {
      results[row.name as keyof Results].tigers = row.tigers;
      results[row.name as keyof Results].dragons = row.dragons;
    });

    supabaseClient
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "games_results" },
        (payload) => {
          results[payload.new.name as keyof Results].tigers =
            payload.new.tigers;
          results[payload.new.name as keyof Results].dragons =
            payload.new.dragons;
          console.log(payload.new);
        },
      )
      .subscribe();
  });

  return (
    <div class={styles.resultContainer}>
      {Object.keys(results).map((k) => (
        <div key={k}>
          <div class={styles.result}>
            <span class={styles.resultIcon}>
              <i
                class={[config.games[k as keyof Games].icon, styles.resultIcon]}
              ></i>
            </span>
            <span class={styles.resultInfo}>
              {results[k as keyof Results].tigers} &nbsp;{" "}
              {results[k as keyof Results].dragons}
            </span>
            <span class={styles.resultLabel}>
              {config.games[k as keyof Games].label}
            </span>
          </div>
          {editMode && (
            <div class={styles.manage}>
              <Link href={"/games/" + k}>Arbitra</Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
});
