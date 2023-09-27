import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import { useCheckSession } from "~/hooks/useCheckSession";
import NoFortitude from "~/shared/components/ui/no-fortitude/no-fortitude";
import Loader from "~/shared/components/ui/loader/loader";
import { useGamesResults } from "~/hooks/useGameResults";
import { useParticipants } from "~/hooks/useParticipants";

export default component$(() => {
  const session = useCheckSession();

  const { initializeContext: initGamesResultsContext } = useGamesResults();
  const { initializeContext: initParticipantsContext } = useParticipants();

  useVisibleTask$(async () => {
    void initGamesResultsContext();
    void initParticipantsContext();
  });

  if (!session.value) {
    return <Loader />;
  }

  if (!session.value?.is_fortitude) {
    return <NoFortitude />;
  }

  return (
    <>
      <Slot />
    </>
  );
});
