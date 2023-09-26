import { component$ } from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import Button from "~/shared/components/ui/button/button";

export default component$(() => {
  return (
    <MainLayout title="Ben fatta!">
      <p>Hai trovato un easter egg! Non hai vinto nulla se non la gloria</p>
      <Button>Default Medium</Button>{" "}
      <Button size="large">Default Large</Button>
      <Button type="selected">Selected Medium</Button>
      <Button type="selected" size="large">
        Selected Large
      </Button>
    </MainLayout>
  );
});
