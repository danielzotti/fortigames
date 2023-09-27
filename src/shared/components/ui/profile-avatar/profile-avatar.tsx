import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./profile-avatar.module.scss";
import { Link, useNavigate } from "@builder.io/qwik-city";
import { config } from "~/config";
import { useAuth } from "~/hooks/useAuth";
import TeamBadge from "../team-badge/team-badge";

interface Props {
  team?: "dragons" | "tigers" | null;
}

export default component$(({ team = null }: Props) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const getUserInitialLetters = () => {
    const fullNameList = auth.value?.user.email?.split("@")?.[0]?.split(".");
    if (!fullNameList?.length) {
      return <i class="fa fa-user"></i>;
    }
    const fistNameLetter = fullNameList[0]?.[0]?.toUpperCase();
    const lastNameLetter = fullNameList[1]?.[0]?.toUpperCase();

    return `${fistNameLetter}${lastNameLetter}`;
  };

  return (
    <>
      <Link
        onClick$={() => navigate(config.urls.profile)}
        class={`${styles.profile} ${team !== null ? styles.team : ""} ${
          team !== null
            ? team === "tigers"
              ? styles.tigers
              : styles.dragons
            : ""
        }`}
      >
        {getUserInitialLetters()}
      </Link>
      {team && (
        <div class={styles.badge}>
          <TeamBadge team={team} />
        </div>
      )}
    </>
  );
});
