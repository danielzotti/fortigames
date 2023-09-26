import { component$, Slot } from "@builder.io/qwik";
import styles from "./button.module.scss";

interface Props {
  size?: "medium" | "large";
  type?: "default" | "selected";
}

export default component$(({ size = "medium", type = "default" }: Props) => {
  return (
    <button class={`btn-${size} btn-${type}`}>
      <Slot />
    </button>
  );
});
