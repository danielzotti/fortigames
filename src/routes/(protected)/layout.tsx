import { component$, Slot } from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import { useCheckSession } from "~/hooks/useCheckSession";
import NoFortitude from "~/shared/components/ui/no-fortitude/no-fortitude";
import Loader from "~/shared/components/ui/loader/loader";

export default component$(() => {
  const session = useCheckSession();

  if (!session.value) {
    return <Loader />;
  }

  if (!session.value?.is_fortitude) {
    return <NoFortitude />;
  }

  return (
    <MainLayout>
      <Slot />
    </MainLayout>
  );
});
