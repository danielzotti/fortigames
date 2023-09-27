import { $, component$, PropFunction } from "@builder.io/qwik";

import Button from "~/shared/components/ui/button/button";
import { config, Games } from "~/config";
import { useLocation } from "@builder.io/qwik-city";
import styles from "./teams-filter.module.scss";

interface Props {
  onItemClick: PropFunction<
    (key: "team" | "game", value: string | null) => void
  >;
}

export default component$(({ onItemClick }: Props) => {
  const location = useLocation();
  const handleClickItem = $((key: "team" | "game", value: string | null) => {
    onItemClick(key, value);
  });

  const isFilterActive = (key: string, value: string) => {
    return location.url.searchParams.get(key) === value;
  };

  return (
    <>
      <div class={styles.filterItem}>
        <div class={styles.category}>Team</div>
        <div class={styles.buttons}>
          <Button
            variant={
              !location.url.searchParams.get("team") ? "selected" : "default"
            }
            onClick$={$(() => handleClickItem("team", null))}
          >
            <span class="icon-no-team"></span>
          </Button>
          {Object.keys(config.teams).map((k) => (
            <Button
              key={k}
              variant={isFilterActive("team", k) ? "selected" : "default"}
              onClick$={() => handleClickItem("team", k)}
            >
              <span class={"icon-" + k}></span>
            </Button>
          ))}
        </div>
      </div>
      <div class={styles.filterItem}>
        <div class={styles.category}>Sport</div>
        <div class={styles.buttons}>
          <Button
            variant={
              !location.url.searchParams.get("game") ? "selected" : "default"
            }
            onClick$={() => handleClickItem("game", null)}
          >
            <i class="fa fa-trophy"></i>
          </Button>
          {Object.keys(config.games).map((k) => {
            const game = config.games[k as keyof Games];
            if (game.team) {
              return (
                <Button
                  key={k}
                  variant={isFilterActive("game", k) ? "selected" : "default"}
                  onClick$={() => handleClickItem("game", k)}
                >
                  <i class={game.icon}></i>
                </Button>
              );
            }
          })}
        </div>
      </div>
    </>
  );
});
