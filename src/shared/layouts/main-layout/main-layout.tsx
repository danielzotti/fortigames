import { component$, Slot } from "@builder.io/qwik";
import ProfileAvatar from "~/shared/components/ui/profile-avatar/profile-avatar";
import BottomNavigation from "~/shared/components/ui/bottom-navigation/bottom-navigation";

import styles from "./main-layout.module.scss";

interface Props {
  title?: string;
}

export default component$(({ title }: Props) => {
  return (
    <div class={styles.container}>
      <div class={styles.top}>
        <div class={styles.blur}></div>
        <h1 class={styles.title}>{title}</h1>
        <ProfileAvatar />
      </div>
      <div class={styles.content}>
        <Slot />
      </div>
      <div class={styles.bottomNavigation}>
        <BottomNavigation />
      </div>
    </div>
  );
});
