import {
  $,
  component$,
  Signal,
  Slot,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import ProfileAvatar from "~/shared/components/ui/profile-avatar/profile-avatar";
import BottomNavigation from "~/shared/components/ui/bottom-navigation/bottom-navigation";
import { useAuth } from "~/hooks/useAuth";
import { supabaseClient } from "~/supabase/supabase-client";

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
    const { auth } = useAuth();
    const team = useSignal<"tigers" | "dragons" | null>(null);

    useVisibleTask$(async () => {
      if (auth.value?.user.email) {
        const { data } = await supabaseClient
          .from("users")
          .select("team")
          .eq("email", auth.value.user.email);

        console.log(data);
        if (data) {
          team.value = data[0].team as "tigers" | "dragons";
        }
      }
    });

    return (
      <>
        <div class={styles.profileAvatar}>
          <ProfileAvatar team={team.value} />
        </div>
        <div class={styles.container}>
          <div class={styles.top}>
            {title && <h1 class={styles.title}>{title}</h1>}
          </div>
          <div
            ref={ref}
            class={`${styles.content} ${
              hasContentPaddingTop ? styles.contentWithPaddingTop : ""
            } ${
              hasContentPaddingInline ? styles.contentWithPaddingInline : ""
            }`}
          >
            <Slot />
          </div>
          <div class={styles.bottomNavigation}>
            <BottomNavigation />
          </div>
        </div>
      </>
    );
  },
);
