import {
  $,
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { supabaseClient } from "~/supabase/supabase-client";
import { Participant } from "~/types/participant.types";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { config } from "~/config";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import styles from "./index.module.scss";
import Button from "~/shared/components/ui/button/button";
import TeamsFilter from "~/shared/components/teams-filter/teams-filter";
import { Games } from "~/types/games.types";
import TeamsSlider from "~/shared/components/teams-slider/teams-slider";

export default component$(() => {
  const people = useSignal<Array<Participant> | null>();
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useSignal<HTMLElement>();
  const filtersRef = useSignal<HTMLElement>();
  const filtersStickyRef = useSignal<HTMLElement>();

  const filterDb = $(
    async ({ team, game }: { team?: string | null; game?: string | null }) => {
      const client = supabaseClient
        .from("users")
        .select("*")
        .is("has_filled_form", true);

      if (team && Object.keys(config.teams).includes(team)) {
        client.eq("team", team);
      }

      if (game && Object.keys(config.games).includes(game)) {
        client.is(config.games[game as keyof Games].db_key, true);
      }

      const { data: participantList } = await client;
      people.value = participantList;
    },
  );

  useVisibleTask$(async () => {
    const team = location.url.searchParams.get("team");
    const game = location.url.searchParams.get("game");

    filterDb({ team, game });

    if (containerRef.value && filtersRef.value) {
      const paddingTop = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--layout-padding-top",
        ),
      );
      const container$ = containerRef.value;
      const filter$ = filtersRef.value;
      const filterSticky$ = filtersStickyRef.value;
      container$.addEventListener("scroll", (e) => {
        const scrollTop = (e.target as HTMLElement).scrollTop;
        if (scrollTop >= filter$?.offsetTop - paddingTop) {
          filterSticky$?.classList.add("sticky");
          filter$?.classList.add("sticky");
        } else {
          filterSticky$?.classList.remove("sticky");
          filter$?.classList.remove("sticky");
        }
      });
    }
  });

  const navigateFilterUrl = $(async (key: string, value: string | null) => {
    const urlParams = new URLSearchParams(location.url.search);

    if (value) {
      urlParams.set(key, value);
    } else {
      urlParams.delete(key);
    }

    const url = `${config.urls.teams}?${urlParams.toString()}`;
    await navigate(url);

    const team = location.url.searchParams.get("team");
    const game = location.url.searchParams.get("game");
    await filterDb({ team, game });
  });

  function isFilterActive(key: string, value: string) {
    return location.url.searchParams.get(key) === value;
  }

  return (
    <MainLayout title="I Team" hasContentPaddingTop={false} ref={containerRef}>

      <TeamsSlider>
        <div class={styles.teamDescriptions}>
          <div class={styles.tigersDescription}>
            La tigre è la regina di tutte le fiere, l’imperatore che regna con
            virtù assoluta
          </div>
          <div class={styles.dragonsDescription}>
            Simbolo di forza e potere e buona fortuna, il drago controlla i
            poteri della forza e dell’auspicio
          </div>
        </div>
      </TeamsSlider>
      {/*Filters*/}

      <div class={styles.filtersContainer} ref={filtersRef}>
        <TeamsFilter onItemClick={navigateFilterUrl} />
      </div>
      <div class={styles.filtersSticky} ref={filtersStickyRef}>
        <TeamsFilter onItemClick={navigateFilterUrl} />
      </div>

      <div class={styles.playersListContainer}>
        <table class={styles.playersList}>
          {people.value &&
            people.value.map((p) => (
              <tr key={p.id}>
                {/*<td>{p.number || "ND"}</td>*/}
                <td>
                <img class={styles.playersListImg} src={`/static/images/${p.company}.png`} alt={p.company || ""} /> {p.firstname} {p.lastname}
                </td>
                <td>
                  {p.team ? (
                    <i class={`icon-${p.team}`}></i>
                  ) : (
                    <i class={`icon-no-team`}></i>
                  )}
                </td>
                <td class={styles.iconContainer}>
                  {p.is_playing_soccer ? (
                    <i class={config.games.soccer.icon}></i>
                  ) : (
                    ""
                  )}
                </td>
                <td class={styles.iconContainer}>
                  {p.is_playing_volley ? (
                    <i class={config.games.volley.icon}></i>
                  ) : (
                    ""
                  )}
                </td>
                <td class={styles.iconContainer}>
                  {p.is_playing_pingpong ? (
                    <i class={config.games.table_tennis.icon}></i>
                  ) : (
                    ""
                  )}
                </td>
                <td class={styles.iconContainer}>
                  {p.is_playing_boardgames ? (
                    <i class="fa fa-chess-rook"></i>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
        </table>
      </div>
    </MainLayout>
  );
});
