import { component$, useComputed$ } from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import BackButton from "~/shared/components/ui/back-button/back-button";
import { config } from "~/config";
import { useConfig } from "~/hooks/useConfig";

export default component$(() => {
  const { config: data } = useConfig();

  return (
    <MainLayout title="Analytics | Admin">
      <BackButton url={config.urls.admin} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </MainLayout>
  );
});
