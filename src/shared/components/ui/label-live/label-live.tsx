import { component$ } from "@builder.io/qwik";
import styles from "./label-live.module.scss";

interface Props {
    text : string
}

export default component$(({ text }: Props) => {
  return (
    <div class={styles.labelLive}>
        {text}
    </div>
  );
});
