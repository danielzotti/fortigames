import {
  $,
  component$,
  Signal,
  Slot,
  useOn,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import ProfileAvatar from "~/shared/components/ui/profile-avatar/profile-avatar";
import BottomNavigation from "~/shared/components/ui/bottom-navigation/bottom-navigation";

import styles from "./main-layout.module.scss";

interface Props {
  title?: string;
  hasContentPaddingTop?: boolean;
  hasContentPaddingInline?: boolean;
  ref?: Signal<HTMLElement | undefined>;
}

export default component$(
  ({
    title,
    hasContentPaddingTop = true,
    hasContentPaddingInline = true,
    ref,
  }: Props) => {
    return (
      <div class={styles.container}>
        <div class={styles.top}>
          <div></div>
          {title && <h1 class={styles.title}>{title}</h1>}
          <ProfileAvatar />
        </div>
        <div
          ref={ref}
          class={`${styles.content} ${
            hasContentPaddingTop ? styles.contentWithPaddingTop : ""
          } ${hasContentPaddingInline ? styles.contentWithPaddingInline : ""}`}
        >
          <Slot />
        </div>
        <div class={styles.bottomNavigation}>
          <BottomNavigation />
        </div>
      </div>
    );
  },
);
