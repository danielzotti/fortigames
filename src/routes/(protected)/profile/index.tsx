import { component$ } from "@builder.io/qwik";
import { Logout } from "~/components/auth/logout/logout";
import { config } from "~/config";
import { Link } from "@builder.io/qwik-city";
import { useAuth } from "~/hooks/useAuth";

export default component$(() => {
  const { auth } = useAuth();

  return (
    <>
      <h1>Profile</h1>
      <h2>{auth.value?.user?.email}</h2>

      {auth.value?.is_admin === true && (
        <p>
          <Link href={config.urls.admin}>Admin</Link>
        </p>
      )}
      <Logout />
      <pre>{JSON.stringify(auth.value, null, 2)}</pre>
    </>
  );
});
