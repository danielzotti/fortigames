import {$, component$, useSignal, useStore, useVisibleTask$} from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import {useLocation} from "@builder.io/qwik-city";
import {supabaseClient} from "~/supabase/supabase-client";
import GameResults from "~/shared/components/games-results/game-results";

interface GameResults {
    dragons: number
    id: number
    last_update: string | null
    name: string | null
    tigers: number
}

export default component$(() => {
    const location = useLocation();
    const game = useSignal(location.params.id);
    const results = useStore<GameResults>({
        dragons: 0,
        id: 0,
        last_update: null,
        name: "",
        tigers: 0
    });

    useVisibleTask$(async () => {
         const {data} = await supabaseClient
            .from("games_results")
            .select("*")
            .eq("name", game.value);

         console.log(data);

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                // @ts-ignore
                results[key] = data[key];
            }
        }
    });

    const updateScore = $(async () => {
        results.last_update = new Date().toISOString();
        const {data, error} = await supabaseClient
            .from("games_results")
            .update({
                dragons: results.dragons,
                tigers: results.tigers,
                last_update: results.last_update
            })
            .eq("name", game.value)
    });

    return (
    <MainLayout>
        <h1>Games {game}</h1>
        <div class="teams-container">
            <div class="single-team">
                Dragons
                <div>
                    {results.dragons}
                </div>
                <button onClick$={[$(() => {results.dragons--}), updateScore]}>
                    Decrement
                </button>
                <button onClick$={[$(() => {results.dragons++}), updateScore]}>
                    Increment
                </button>
            </div>

            <div class="single-team">
                Tigers
                <div>
                    {results.tigers}
                </div>
                <button onClick$={[$(() => {results.tigers--}), updateScore]}>
                    Decrement
                </button>
                <button onClick$={[$(() => {results.tigers++}), updateScore]}>
                    Increment
                </button>
            </div>
        </div>
    </MainLayout>
  );
});
