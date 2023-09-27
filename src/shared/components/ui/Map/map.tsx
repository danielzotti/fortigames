import { component$, useContext } from "@builder.io/qwik";
import styles from "./map.module.scss";
import { ThemeContext } from "~/contexts/theme.context";

import MapDark from "../../../../../public/static/backgrounds/map_dark.png?jsx";
import MapLight from "../../../../../public/static/backgrounds/map_light.png?jsx";

export default component$(() => {
  const theme = useContext(ThemeContext);

  return (
    <div class={styles.mapWrapper}>
      {theme.value === "light" ? <MapLight /> : <MapDark />}
    </div>
  );
});
