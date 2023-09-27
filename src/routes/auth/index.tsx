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
        .select("is_admin, is_referee, is_facilitator, team")
        .eq("email", session.user.email);

      isEmailFromFortitudeDomain.value = !!data?.length;

      enhancedSession = {
        ...session,
        is_admin: data?.[0]?.is_admin ?? false,
        is_referee: data?.[0]?.is_referee ?? false,
        is_facilitator: data?.[0]?.is_facilitator ?? false,
        is_fortitude: !!data?.length,
        team: data?.[0]?.team as TeamsValues,
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

  // return <p>Checking JWT... Do not refresh page!</p>;
  return <Loader />;
});
