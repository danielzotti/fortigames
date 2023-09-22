import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { Login } from "~/components/auth/login/login";
import { Logout } from "~/components/auth/logout/logout";
import { routeLoader$ } from "@builder.io/qwik-city";
import { createServerClient } from "supabase-auth-helpers-qwik";
import { supabaseClient } from "~/supabase/supabase-client";
import type { User } from "@supabase/supabase-js";

export const useDbUsers = routeLoader$(async (requestEv) => {
  const supabaseClient = createServerClient(
    requestEv.env.get("PUBLIC_SUPABASE_URL")!,
    requestEv.env.get("PUBLIC_SUPABASE_ANON_KEY")!,
    requestEv,
    {},
  );
  const { data, error } = await supabaseClient.from("users").select("*");

  error && console.log({ error });

  return data;
});

export default component$(() => {
  const user = useSignal<User | null>(null);

  const testTable = useDbUsers();

  useVisibleTask$(async () => {
    const {
      data: { user: userInfo },
    } = await supabaseClient.auth.getUser();
    user.value = userInfo;
    console.log({ userInfo });
  });

  if (!user.value) {
    return <Login />;
  }

  return (
    <>
      <h1>Welcome to Fortigames 2023</h1>

      <Logout />

      <pre>User: {user.value.email}</pre>

      <pre>Test table data: {JSON.stringify(testTable.value ?? "none")}</pre>
    </>
  );
});

export const head: DocumentHead = {
  title: "Fortigames 2023 title",
  meta: [
    {
      name: "description",
      content: "Fortigames 2023 description",
    },
  ],
};
