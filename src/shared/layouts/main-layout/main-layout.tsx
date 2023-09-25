import { component$, Slot } from "@builder.io/qwik";
import ProfileAvatar from "~/shared/components/ui/profile-avatar/profile-avatar";
import BottomNavigation from "~/shared/components/ui/bottom-navigation/bottom-navigation";

import styles from "./main-layout.module.scss";

export default component$(() => {
  return (
    <div class={styles.container}>
      <div class={styles.profileAvatar}>
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
