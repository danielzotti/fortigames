import { component$ } from "@builder.io/qwik";
import styles from "./bottom-navigation.module.scss";
import { Link, useLocation } from "@builder.io/qwik-city";
import { config } from "~/config";

export default component$(() => {
  const location = useLocation();

  return (
    <div class={styles.container}>
      <div class={styles.menu}>
        <Link
          class={`${styles.menuItem} ${
            location.url.pathname === config.urls.home ? "active" : ""
          }`}
          href={config.urls.home}
        >
          <i class="fa fa-home"></i>
        </Link>
        <Link
          class={`${styles.menuItem} ${
            location.url.pathname.startsWith(config.urls.teams) ? "active" : ""
          }`}
          href={config.urls.teams}
        >
          <i class="fa fa-t-shirt"></i>
        </Link>
        <Link
          class={`${styles.menuItem} ${
            location.url.pathname.startsWith(config.urls.games) ? "active" : ""
          }`}
          href={config.urls.games}
        >
          <i class="fa fa-trophy"></i>
        </Link>
        <Link
          class={`${styles.menuItem} ${
            location.url.pathname.startsWith(config.urls.boardGames)
              ? "active"
              : ""
          }`}
          href={config.urls.boardGames}
        >
          <i class="fa fa-chess-rook"></i>
        </Link>
        <Link
          class={`${styles.menuItem} ${
            location.url.pathname.startsWith(config.urls.info) ? "active" : ""
          }`}
          href={config.urls.info}
        >
          <i class="fa fa-info-circle"></i>
        </Link>
      </div>
    </div>
  );
});
