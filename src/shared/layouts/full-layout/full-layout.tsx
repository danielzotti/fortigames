import { component$, Slot } from "@builder.io/qwik";

import styles from "./full-layout.module.scss";

export default component$(() => {
  return (
    <div class={styles.container}>
      <div class={styles.content}>
        <Slot />
      </div>
    </div>
  );
});
