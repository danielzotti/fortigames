import { component$ } from "@builder.io/qwik";
import styles from "./label-live.module.scss";

interface Props {
  text: string;
  isLive?: boolean;
}

export default component$(({ text, isLive }: Props) => {
  if (!text) {
    return null;
  }
  return (
    <div class={isLive ? styles.labelLive : styles.labelLiveOff}>{text}</div>
  );
});
