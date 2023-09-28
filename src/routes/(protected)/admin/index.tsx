import { component$, useComputed$ } from "@builder.io/qwik";
import { Participant } from "~/types/participant.types";
import Loader from "~/shared/components/ui/loader/loader";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import { useParticipants } from "~/hooks/useParticipants";
import { useAuth } from "~/hooks/useAuth";
import Button from "~/shared/components/ui/button/button";
import { config } from "~/config";
import BackButton from "~/shared/components/ui/back-button/back-button";

export default component$(() => {
  const { user } = useAuth();
  const { usersList, store } = useParticipants();
  const people = useComputed$<Participant[]>(() => {
    return [...usersList.value].sort((a, b) => {
      if (a.is_admin === b.is_admin) {
        return a.email.localeCompare(b.email);
      }
      return !!a.is_admin < !!b.is_admin ? 1 : -1;
    });
  });

  return (
    <MainLayout title="Admin">
      <BackButton url={config.urls.profile} />

      {user && <pre>Current user: {user?.email}</pre>}

      <Button isLink={true} href={`${config.urls.admin}/users`}>
        Utenti
      </Button>
      <Button isLink={true} href={`${config.urls.admin}/config`}>
        Configurazione
      </Button>
      {/*<Button isLink={true} href={`${config.urls.admin}/analytics`}>
        Statistiche
      </Button>*/}
    </MainLayout>
  );
});
