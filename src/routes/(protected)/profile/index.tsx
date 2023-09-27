import { component$ } from "@builder.io/qwik";
import { Logout } from "~/components/auth/logout/logout";
import { config } from "~/config";
import { Link } from "@builder.io/qwik-city";
import { useAuth } from "~/hooks/useAuth";
import MainLayout from "~/shared/layouts/main-layout/main-layout";

export default component$(() => {
  const { auth } = useAuth();

  return (
    <MainLayout title="Profilo">
      <p>
        <strong>{auth.value?.user?.email}</strong>
      </p>
      {auth.value?.is_admin === true && (
        <p>
          <Link href={config.urls.admin}>Admin</Link>
        </p>
      )}
      <Logout />
      <pre>{JSON.stringify(auth.value, null, 2)}</pre>
    </MainLayout>
  );
});
