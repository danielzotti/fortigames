import { component$, Slot } from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";

export default component$(() => {
  return (
    <MainLayout>
      <Slot />
    </MainLayout>
  );
});
