import { component$ } from "@builder.io/qwik";
import styles from "./loader.module.scss";

export default component$(() => {
  return (
    <div class={styles.loader}>
      <i class="fa fa-circle fa-spin"></i>
    </div>
  );
});
