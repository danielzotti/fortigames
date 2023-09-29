import { component$, PropFunction, QRL, Slot } from "@builder.io/qwik";
import styles from "./button.module.scss";
import { Link } from "@builder.io/qwik-city";

type BasicProps = {
  size?: "medium" | "large";
  variant?: "default" | "selected";
  type?: "submit" | "reset" | "button";
  class?: string;
};
type LinkProps = {
  isLink?: boolean;
  href?: string;
  target?: "_blank";
};
type ButtonProps = {
  onClick$?: PropFunction<() => void> | PropFunction<() => void>[];
  disabled?: boolean;
};

type Props = BasicProps & LinkProps & ButtonProps; // TODO: check types!

export default component$(
  ({
    size = "medium",
    variant = "default",
    type = "button",
    onClick$,
    isLink = false,
    href,
    target,
    disabled = false,
    class: _class,
  }: Props) => {
    if (isLink) {
      return (
        <Link
          type={type}
          class={[styles.link, `btn-${size}`, `btn-${variant}`, _class]}
          href={href}
          target={target}
        >
          <Slot />
        </Link>
      );
    }
    return (
      <button
        type={type}
        disabled={disabled}
        class={[
          _class,
          `btn-${size}`,
          `btn-${variant}`,
          `${disabled ? "disabled" : ""}`,
        ]}
        onClick$={[onClick$]}
      >
        <Slot />
      </button>
    );
  },
);
