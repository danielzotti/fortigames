import { component$, useContext } from "@builder.io/qwik";
import styles from "./location-map.module.scss";
import { ThemeContext } from "~/contexts/theme.context";

import MapDark from "../../../../../public/static/backgrounds/map_dark.png?jsx";
import MapLight from "../../../../../public/static/backgrounds/map_light.png?jsx";
import Button from "~/shared/components/ui/button/button";

export default component$(() => {
  const theme = useContext(ThemeContext);

  return (
    <div class={styles.mapWrapper}>
      <Button
        class={styles.mapLink}
        href="https://maps.app.goo.gl/T23BwGW6LLdEnC5Y8"
        isLink={true}
        target="_blank"
      >
        Apri Maps
      </Button>
      {theme.value === "light" ? <MapLight /> : <MapDark />}
    </div>
  );
});
