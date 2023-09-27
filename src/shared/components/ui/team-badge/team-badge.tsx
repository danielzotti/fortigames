import { component$ } from "@builder.io/qwik";
import styles from "./team-badge.module.scss";
import { TeamsValues } from "~/types/teams.types";

interface Props {
  team?: TeamsValues;
}

export default component$(({ team }: Props) => {
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
