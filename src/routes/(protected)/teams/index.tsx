import {
  $,
  component$,
  useComputed$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { CompanyValues, Participant } from "~/types/participant.types";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { config } from "~/config";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import styles from "./index.module.scss";
import TeamsFilter from "~/shared/components/teams-filter/teams-filter";
import { useParticipants } from "~/hooks/useParticipants";
import { Games } from "~/types/games.types";
import TeamsSlider from "~/shared/components/teams-slider/teams-slider";
import CompanyLogo from "~/shared/components/ui/company-logo/company-logo";

type ParticipationFlags =
  | "is_playing_soccer"
  | "is_playing_pingpong"
  | "is_playing_volley"
  | "is_playing_boardgames";

export default component$(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useSignal<HTMLElement>();
  const filtersRef = useSignal<HTMLElement>();
  const filtersStickyRef = useSignal<HTMLElement>();
  const { participantsList } = useParticipants();

  const people = useComputed$<Participant[]>(() => {
    const team = location.url.searchParams.get("team");
    const game = location.url.searchParams.get("game");

    let filteredList = participantsList.value.filter((p) => !!p.team);

    if (team && Object.keys(config.teams).includes(team)) {
      filteredList = filteredList.filter((p) => p.team === team);
    }

    if (game && Object.keys(config.games).includes(game)) {
      filteredList = filteredList.filter(
        (p) =>
          p[config.games[game as keyof Games].db_key as ParticipationFlags] ===
          true,
      );
    }
    return [...filteredList].sort((a, b) => a.email.localeCompare(b.email));
  });

  useVisibleTask$(async () => {
    // Observe Scroll for Sticky filters
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
  });

  return (
    <MainLayout title="I Team" hasContentPaddingTop={false} ref={containerRef}>
      <TeamsSlider>
        <div class={styles.teamDescriptions}>
          <div class={styles.tigersDescription}>
            La tigre è il re di tutte le fiere, l’imperatore che regna con virtù
            assoluta
            <br />
            <br />
          </div>
          <div class={styles.dragonsDescription}>
            Simbolo di forza e potere e buona fortuna, il drago controlla i
            poteri della forza e dell’auspicio
          </div>
        </div>
      </TeamsSlider>

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
                <td>
                  <div class={styles.name}>
                    <CompanyLogo company={p.company as CompanyValues} />
                    <span>{p.firstname}</span>
                    <span>{p.lastname}</span>
                  </div>
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
