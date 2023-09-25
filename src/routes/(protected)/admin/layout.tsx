import { component$, Slot } from "@builder.io/qwik";
import { useAuth } from "~/hooks/useAuth";
import Unauthorized from "~/shared/components/ui/unauthorized/unauthorized";

export default component$(() => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Unauthorized />;
  }
  return <Slot />;
});
