import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { supabaseClient } from "~/supabase/supabase-client";
import { Participant } from "~/types/participant.types";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { config, Games } from "~/config";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import styles from "./index.module.scss";
import Button from "~/shared/components/ui/button/button";

export default component$(() => {
  const people = useSignal<Array<Participant> | null>();
  const loc = useLocation();
  const navigate = useNavigate();

  useVisibleTask$(async () => {
    const team = loc.url.searchParams.get("team");
    const game = loc.url.searchParams.get("game");

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
  });

  const navigateFilterUrl = $((key: string, value: string | null) => {
    const urlParams = new URLSearchParams(loc.url.search);
    if (value) {
      urlParams.set(key, value);
    } else {
      urlParams.delete(key);
    }

    const url = `${config.urls.teams}?${urlParams.toString()}`;
    navigate(url);
  });

  function isFilterActive(key: string, value: string) {
    return loc.url.searchParams.get(key) === value;
  }

  return (
    <MainLayout title="I Team" hasContentPaddingTop={false}>
      <div class={styles.teamsContainer}>
        <div class={[styles.teamContainer, styles.tigers]}>
          <div class={styles.teamCover}></div>
          <div class={styles.teamInfoContainer}>
            <div class={styles.teamTitle}>Tigers</div>
            <div class={styles.teamDescription}>
              La tigre è la regina di tutte le fiere, l’imperatore che regna con
              virtù assoluta
            </div>
          </div>
        </div>
        <div class={[styles.teamContainer, styles.dragons]}>
          <div class={styles.teamCover}></div>
          <div class={styles.teamInfoContainer}>
            <div class={styles.teamTitle}>Dragons</div>
            <div class={styles.teamDescription}>
              Simbolo di forza e potere e buona fortuna, il drago controlla i
              poteri della forza e dell’auspicio
            </div>
          </div>
        </div>
      </div>
      <ul class="teams-list tabs-container">
        <li class={!loc.url.searchParams.get("team") && "is-active"}>
          <Button onClick$={() => navigateFilterUrl("team", null)}>All</Button>
        </li>
        {Object.keys(config.teams).map((k) => (
          <li class={isFilterActive("team", k) && "is-active"} key={k}>
            <Button onClick$={() => navigateFilterUrl("team", k)}>
              {config.teams[k as keyof typeof config.teams].label}
            </Button>
          </li>
        ))}
      </ul>
      Persone
      <ul class="teams-games tabs-container">
        <li class={!loc.url.searchParams.get("game") && "is-active"}>
          <Button onClick$={() => navigateFilterUrl("game", null)}>All</Button>
        </li>
        {Object.keys(config.games).map((k) => {
          const game = config.games[k as keyof Games];
          if (game.team) {
            return (
              <li class={isFilterActive("game", k) && "is-active"} key={k}>
                <Button onClick$={() => navigateFilterUrl("game", k)}>
                  {game.label}
                </Button>
              </li>
            );
          }
        })}
      </ul>
      <table class={styles.playersList}>
        {people.value &&
          people.value.map((p) => (
            <tr key={p.id}>
              {/*<td>{p.number || "ND"}</td>*/}
              <td>
                {p.firstname} {p.lastname} ({p.company})
              </td>
              <td>
                {p.team ? (
                  <span class={[styles[p.team], styles.team]}></span>
                ) : (
                  <span class={[styles.noTeam, styles.team]}></span>
                )}
              </td>
              <td class={styles.iconContainer}>
                {p.is_playing_soccer ? <i class="fa fa-soccer-ball"></i> : ""}
              </td>
              <td class={styles.iconContainer}>
                {p.is_playing_volley ? (
                  <i class="fa fa-volleyball-ball"></i>
                ) : (
                  ""
                )}
              </td>
              <td class={styles.iconContainer}>
                {p.is_playing_pingpong ? (
                  <i class="fa fa-table-tennis-paddle-ball"></i>
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
    </MainLayout>
  );
});
