import { component$ } from "@builder.io/qwik";
import styles from "./team-badge.module.scss";
import { useNavigate } from "@builder.io/qwik-city";
import { useAuth } from "~/hooks/useAuth";

interface Props {
  team?: "dragons" | "tigers";
}

export default component$(({ team }: Props) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      class={`${styles.teamBadge} ${
        team === "dragons" ? styles.dragons : styles.tigers
      }`}
    >
      <div>{team === "dragons" ? "竜" : "虎"}</div>
    </div>
  );
});
