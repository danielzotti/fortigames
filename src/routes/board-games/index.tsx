import { component$ } from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";

export default component$(() => {
  return (
    <MainLayout>
      <h1>Boardgames</h1>
    </MainLayout>
  );
});
