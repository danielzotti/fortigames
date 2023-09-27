import { $, component$, Signal } from "@builder.io/qwik";
import Button from "~/shared/components/ui/button/button";
import styles from "./back-top-button.module.scss";

interface Props {
  ref: Signal<HTMLElement | undefined>;
}

export default component$(({ ref }: Props) => {
  const scrollToTop = $(() => {
    if (ref.value) {
      ref.value.scrollTo({
        top: 0,
      });
    }
  });
  return (
    <Button onClick$={scrollToTop} variant="selected" class={styles.button}>
      Top
      <i class="fa fa-chevron-up"></i>
    </Button>
  );
});
