import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { getSessionFromHash } from "~/shared/utils/auth";
import { config } from "~/config";
import { useNavigate } from "@builder.io/qwik-city";
import { supabaseClient } from "~/supabase/supabase-client";
import { AuthSession } from "~/types/auth.types";
import { useAuth } from "~/hooks/useAuth";
import NoFortitude from "~/shared/components/ui/no-fortitude/no-fortitude";
import { TeamsValues } from "~/types/teams.types";
import Loader from "~/shared/components/ui/loader/loader";

export default component$(() => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const isEmailFromFortitudeDomain = useSignal<boolean | undefined>();

  useVisibleTask$(async () => {
    const session = getSessionFromHash(window.location.hash);

    if (!session) {
      console.log("error with JWT");
      return;
    }

    let enhancedSession: AuthSession = session;

    if (session.user.email) {
      // Get additional info from users table
      const { data } = await supabaseClient
        .from("users")
        .select("*")
        .eq("email", session.user.email);

      isEmailFromFortitudeDomain.value = !!data?.length;

      const u = data?.[0];
      enhancedSession = {
        ...session,
        is_admin: u?.is_admin ?? false,
        is_referee: u?.is_referee ?? false,
        is_facilitator: u?.is_facilitator ?? false,
        is_fortitude: !!data?.length,
        team: u?.team as TeamsValues,
        firstname: u?.firstname,
        lastname: u?.lastname,
        is_playing_soccer: u?.is_playing_soccer,
        is_playing_pingpong: u?.is_playing_pingpong,
        is_playing_volley: u?.is_playing_volley,
        is_playing_boardgames: u?.is_playing_boardgames,
      };
    }

    localStorage.setItem(
      config.jwtTokenLocalStorageName,
      JSON.stringify(enhancedSession),
    );
    auth.value = enhancedSession;

    await navigate(config.urls.home);
  });

  if (isEmailFromFortitudeDomain.value === false) {
    return <NoFortitude />;
  }

  return <Loader />;
});
