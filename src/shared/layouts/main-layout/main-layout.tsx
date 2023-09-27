import { component$, Slot, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import ProfileAvatar from "~/shared/components/ui/profile-avatar/profile-avatar";
import BottomNavigation from "~/shared/components/ui/bottom-navigation/bottom-navigation";

import styles from "./main-layout.module.scss";
import { useAuth } from "~/hooks/useAuth";
import { supabaseClient } from "~/supabase/supabase-client";

interface Props {
  title?: string;
  hasContentPaddingTop?: boolean;
}

export default component$(({ title, hasContentPaddingTop = true }: Props) => {
  const { auth } = useAuth();
  const team = useSignal<"tigers" | "dragons" | null>(null);

  useVisibleTask$(async () => {
    if (auth.value?.user.email) {
      const { data } = await supabaseClient
        .from("users")
        .select("team")
        .eq("email", auth.value.user.email);

      if (data) {
        team.value = data[0].team;
      }
    }
  });

  return (
    <div class={styles.container}>
      <div class={styles.top}>
        <div></div>
        {title && <h1 class={styles.title}>{title}</h1>}
        <ProfileAvatar team={team.value} />
      </div>
      <div
        class={`${styles.content} ${
          hasContentPaddingTop ? styles.contentWithPadding : ""
        }`}
      >
        <Slot />
      </div>
      <div class={styles.bottomNavigation}>
        <BottomNavigation />
      </div>
    </div>
  );
});
