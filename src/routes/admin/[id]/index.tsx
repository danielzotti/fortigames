import {$, component$, QwikSubmitEvent, useSignal, useStore, useVisibleTask$} from '@builder.io/qwik';
import {supabaseClient} from "~/supabase/supabase-client";
import {Participant} from "~/types/participant.types";
import { useLocation, routeAction$, Form } from '@builder.io/qwik-city';

/*export const useEditUser = routeAction$(async (formData, requestEvent) => {
    const { error, data } = await supabaseClient
        .from('users')
        .update({ team: formData.team, email: formData.email })
        .eq('id', formData.id)
        .select()


    console.log(error, data)
    return {
        success: !error?.code
    };
});*/

export default component$(() => {
    // const action = useEditUser();
    const edited = false;
    let partecipant = useSignal<Participant | null>();
    const loc = useLocation();
    const participant : Participant = {
        company: "",
        firstname: "",
        has_filled_form: false,
        id: 0,
        is_admin: false,
        is_facilitator: false,
        is_playing_boardgames: false,
        is_playing_pingpong: false,
        is_playing_soccer: false,
        is_playing_volley: false,
        is_referee: false,
        lastname: "",
        number: null,
        team: "",
        email: ''
    };

    const pStore = useStore({
        company: "",
        firstname: "",
        has_filled_form: false,
        id: 0,
        is_admin: false,
        is_facilitator: false,
        is_playing_boardgames: false,
        is_playing_pingpong: false,
        is_playing_soccer: false,
        is_playing_volley: false,
        is_referee: false,
        lastname: "",
        number: null,
        team: "",
        email: ''
    })

    useVisibleTask$(async () => {
        const { data: partecipants } = await supabaseClient
            .from("users")
            .select("*")
            //.update({ team: formData.team, email: formData.email }) TODO
            .eq("id", loc.params.id);

       // partecipant.value = partecipants?.length ? partecipants[0] : null

        console.log(participant)
    });

    const editAction = $((event: QwikSubmitEvent) => {
        console.log(event, participant);
    });

    return <>
        {partecipant.value && (
            <>
                <div>
                    {partecipant.value?.firstname} {partecipant.value?.lastname}
                </div>
                <form onSubmit$={editAction} preventdefault:submit>
                    <input name="email" value={participant.email}/>

                    {/*<div> {partecipant.value?.team}
                        <select name="team" id="team" bind:value={pStore.team}>
                            <option value=""></option>
                            <option value="tigers">tigers</option>
                            <option value="dragons">dragons</option>
                        </select>
                    </div>*/}

                    <div>
                        <button type="submit">Edit</button>
                    </div>
                </form></>
        )}
        {edited && (
            <p>User Edited successfully</p>
        )}
        {/*{action?.submitted && (
            <p>User Edited successfully</p>
        )}*/}
    </>;
});