import {$, component$} from "@builder.io/qwik";
import {supabaseClient} from "~/supabase/supabase-client";
import {useLocation} from "@builder.io/qwik-city";

export const Login = component$(() => {

    const location = useLocation();

    const handleGoogleLogin = $(async () => {
        supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: location + '/auth'
            }
        }).catch(ex => console.log('Problems during auth with Google', ex));

    })

    return <>
        <button onClick$={handleGoogleLogin}>Login with Google</button>
    </>

})
