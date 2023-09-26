import { component$ } from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";

export default component$(() => {
  return (
    <MainLayout title="Ben fatta!">
      <p>Hai trovato un easter egg! Non hai vinto nulla se non la gloria</p>
    </MainLayout>
  );
});
