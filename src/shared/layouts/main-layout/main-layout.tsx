import { component$, Slot } from "@builder.io/qwik";
import ProfileAvatar from "~/shared/components/ui/profile-avatar/profile-avatar";
import BottomNavigation from "~/shared/components/ui/bottom-navigation/bottom-navigation";

import styles from "./main-layout.module.scss";
import { useCheckSession } from "~/hooks/useCheckSession";

interface Props {
  fullWidth?: boolean;
}

export default component$(({ fullWidth = false }: Props) => {
  const session = useCheckSession();

  if (!session.value) {
    return <p>Loading...</p>;
  }

  return (
    <div
      class={styles.container}
      style={{ maxWidth: fullWidth ? "100%" : "800px" }}
    >
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
