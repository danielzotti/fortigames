import { $, component$ } from "@builder.io/qwik";
import { supabaseClient } from "~/supabase/supabase-client";
import { useLocation } from "@builder.io/qwik-city";
import { config } from "~/config";

export const Login = component$(() => {
  const location = useLocation();

  console.warn(location.url.origin + "/auth");
  const handleGoogleLogin = $(async () => {
    supabaseClient.auth
      .signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: location.url.origin + config.urls.auth,
        },
      })
      .catch((ex) => console.log("Problems during auth with Google", ex));
  });

  return (
    <>
      <button onClick$={handleGoogleLogin}>Login with Google</button>
    </>
  );
});
