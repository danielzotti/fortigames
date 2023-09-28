import { component$ } from "@builder.io/qwik";
import { Logout } from "~/components/auth/logout/logout";
import { config } from "~/config";
import styles from "./index.module.scss";
import { useAuth } from "~/hooks/useAuth";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import Button from "~/shared/components/ui/button/button";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  const {
    isAdmin,
    isReferee,
    isFacilitator,
    team,
    firstname,
    lastname,
    is_playing_pingpong,
    is_playing_soccer,
    is_playing_boardgames,
    is_playing_volley,
  } = useAuth();

  return (
    <MainLayout title="Profilo">
      <div class={styles.container}>
        <h2 class={styles.name}>
          {firstname} {lastname}
        </h2>
        <div class={styles.gameList}>
          {is_playing_volley && (
            <span>
              <i class={config.games.volley.icon}></i>{" "}
              {config.games.volley.label}
            </span>
          )}
          {is_playing_soccer && (
            <span>
              <i class={config.games.soccer.icon}></i>{" "}
              {config.games.soccer.label}
            </span>
          )}
          {is_playing_pingpong && (
            <span>
              <i class={config.games.table_tennis.icon}></i>{" "}
              {config.games.table_tennis.label}
            </span>
          )}
          {is_playing_boardgames && (
            <span>
              <i class={config.games.board_games.icon}></i>{" "}
              {config.games.board_games.label}
            </span>
          )}
        </div>
        <div class={styles.chatList}>
          <h3 class={styles.chatTitle}>Chatta con</h3>
          {!!team && (
            <div>
              <Link href={config.slack.urls.dragons} target="_blank">
                Il tuo team
              </Link>
            </div>
          )}
          {(isReferee === true ||
            isFacilitator === true ||
            isAdmin === true) && (
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

          {isAdmin === true && (
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
