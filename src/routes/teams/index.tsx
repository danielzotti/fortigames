import {component$, useSignal, useVisibleTask$} from '@builder.io/qwik';
import {supabaseClient} from "~/supabase/supabase-client";
import { Participant } from "~/types/participant.types";
import {Link, useLocation} from '@builder.io/qwik-city';
import MainLayout from "~/shared/layouts/main-layout/main-layout";

enum Teams {
    dragons= 'dragons',
    tigers = 'tigers'
}

export default component$(() => {
    const people = useSignal<Array<Participant> | null>();
    const loc = useLocation();

    useVisibleTask$(async () => {

        const team = loc.url.searchParams.get('team');

        if(team === Teams.tigers || team === Teams.dragons){
            const { data: participantList } = await supabaseClient
                .from("users")
                .select("*")
                .eq('team', team);

            people.value = participantList;
        }
        else {
            const { data: participantList } = await supabaseClient
                .from("users")
                .select("*");

            people.value = participantList;
        }

    });


    return <MainLayout>
        <h1>Teams</h1>
        <a href={"/teams/?team=tigers"}>Tigers</a> /
        <a href={"/teams/?team=dragons"}>Dragons</a>
        <div>
            {people.value && people.value.map((p) => (
                <div key={p.id}>
                    {p.firstname} {p.lastname} {p.number} ({p.company})
                    {p.has_filled_form ? "X" : ""}
                    {p.is_playing_soccer ? "X" : ""}
                    {p.is_playing_volley ? "X" : ""}
                    {p.is_playing_pingpong ? "X" : ""}
                    {p.is_playing_boardgames ? "X" : ""}
                    {p.is_referee ? "X" : ""}
                    {p.is_facilitator ? "X" : ""}
                </div>
            ))}
        </div>
    </MainLayout>;
});