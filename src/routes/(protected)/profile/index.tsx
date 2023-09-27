import { component$ } from "@builder.io/qwik";
import { Logout } from "~/components/auth/logout/logout";
import { config } from "~/config";
import styles from "./index.module.scss";
import { useAuth } from "~/hooks/useAuth";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import Button from "~/shared/components/ui/button/button";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  const { auth } = useAuth();

  return (
    <MainLayout title="Profilo">
      <div class={styles.container}>
        
        {/*<div>
          <strong>{auth.value?.user?.email}</strong>
        </div>*/}
        <div class={styles.chatList}>
          <h3 class={styles.chatTitle}>Chatta con</h3>
          {!!auth.value?.team && (
            <div>
              <Link href={config.slack.urls.dragons} target="_blank">
                Il tuo team
              </Link>
            </div>
          )}
          {(auth.value?.is_referee === true ||
            auth.value?.is_facilitator === true) && (
            <div>
              <Link href={config.slack.urls.admins} target="_blank">
                I facilitatori
              </Link>
            </div>
          )}
          <div>
            <Link href={config.slack.urls.boardGames} target="_blank">
              I Boardgamers
            </Link>
          </div>
          {/*<div>
            <Link href={config.slack.urls.convention} target="_blank">
              Tutti
            </Link>
          </div>*/}

{auth.value?.is_admin === true && (
          <div class={styles.admin}>
            <Button isLink={true} href={config.urls.admin}>
              Amministra
            </Button>
          </div>
        )}
        </div>
        <div class={styles.logout}>
          <Logout />
        </div>
      </div>
    </MainLayout>
  );
});
