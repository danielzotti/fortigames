import { component$, PropFunction, QRL, Slot } from "@builder.io/qwik";
import styles from "./button.module.scss";

interface Props {
  size?: "medium" | "large";
  variant?: "default" | "selected";
  onClick$?: PropFunction<() => void> | PropFunction<() => void>[];
  type?: "submit" | "reset" | "button";
}

export default component$(
  ({
    size = "medium",
    variant = "default",
    type = "button",
    onClick$,
  }: Props) => {
    return (
      <button
        type={type}
        class={`btn-${size} btn-${variant}`}
        onClick$={[onClick$]}
      >
        <Slot />
      </button>
    );
  },
);
