import { component$ } from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";

export default component$(() => {
  return (
    <MainLayout title="Board games">
      <p>Todo: list of boardgames</p>
    </MainLayout>
  );
});
