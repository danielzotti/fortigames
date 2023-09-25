import { component$ } from "@builder.io/qwik";
import styles from "./unauthorized.module.scss";
import { Link } from "@builder.io/qwik-city";
import { config } from "~/config";

export default component$(() => {
  return (
    <div class={styles.container}>
      <h1>Non sei autorizzato a visualizzare questa pagina!</h1>
      <p>
        Torna a <Link href={config.urls.home}>casa</Link>
      </p>
    </div>
  );
});
