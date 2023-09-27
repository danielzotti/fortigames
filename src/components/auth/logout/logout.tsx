import { $, component$ } from "@builder.io/qwik";
import { createClient } from "@supabase/supabase-js";
import { config } from "~/config";
import Button from "~/shared/components/ui/button/button";

export const Logout = component$(() => {
  const handleGoogleLogout = $(async () => {
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL || "",
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY || "",
    );

    const { error } = await supabase.auth.signOut();
    if (!error) {
      location.href = config.urls.login;
    }
  });

  return (
    <>
      <Button onClick$={handleGoogleLogout}>Logout</Button>
    </>
  );
});
