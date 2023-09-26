import { component$ } from "@builder.io/qwik";
import styles from "./no-fortitude.module.scss";
import { Logout } from "~/components/auth/logout/logout";

export default component$(() => {
  return (
    <div class={styles.container}>
      <h1>Attenzione!</h1>
      <p>
        Attenzione! L'email con la quale ti sei autenticato non è nella lista!
        Sei pregato di provare con un'email del gruppo Fortitude. Se ne hai più
        di una, prova con un'altra. Grazie.
        <Logout />
      </p>
    </div>
  );
});
