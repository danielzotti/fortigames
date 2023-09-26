import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { supabaseClient } from "~/supabase/supabase-client";
import { Participant } from "~/types/participant.types";
import { useLocation } from "@builder.io/qwik-city";
import {config, Games} from "~/config";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import styles from "./index.module.scss"

export default component$(() => {
  const people = useSignal<Array<Participant> | null>();
  const loc = useLocation();

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

    const { data: participantList, error } = await client;
    people.value = participantList;
  });

  function createFilterUrl(key: string, value: string | null) {
    const urlParams = new URLSearchParams(loc.url.search);
    if (value) {
      urlParams.set(key, value);
    } else {
      urlParams.delete(key);
    }

    return "/teams/?" + urlParams.toString();
  }

  function isFilterActive(key: string, value: string) {
    return loc.url.searchParams.get(key) === value;
  }

  return (
    <MainLayout title="I Team">
      <div class={styles.teamsContainer}>
        <div class={[styles.teamContainer, styles.tigers]}>
          <div class={styles.teamCover}></div>
          <div class={styles.teamInfoContainer}>
            <div class={styles.teamTitle}>
              Tigers
            </div>
            <div class={styles.teamDescription}>
              La tigre è la regina di tutte le fiere, l’imperatore che regna con virtù assoluta
            </div>
          </div>
        </div>
        <div class={[styles.teamContainer, styles.dragons]}>
          <div class={styles.teamCover}></div>
          <div class={styles.teamInfoContainer}>
            <div class={styles.teamTitle}>
              Dragons
            </div>
            <div class={styles.teamDescription}>
              Simbolo di forza e potere e buona fortuna, il drago controlla i poteri della forza e dell’auspicio
            </div>
          </div>
        </div>
      </div>
      <ul class="teams-list tabs-container">
        <li class={!loc.url.searchParams.get("team") && "is-active"}>
          <a  href={createFilterUrl("team", null)}>All</a>
        </li>
        {Object.keys(config.teams).map((k) => (
          <li class={isFilterActive("team", k) && "is-active"} key={k}>
            <a href={createFilterUrl("team", k)}>{config.teams[k].label}</a>
          </li>
        ))}
      </ul>
      Persone
      <ul class="teams-games tabs-container">
        <li class={!loc.url.searchParams.get("game") && "is-active"}>
          <a  href={createFilterUrl("game", null)}>All</a>
        </li>
        {Object.keys(config.games).map((k) => {
          const game = config.games[k as keyof Games];
          if (game.team) {
            return (
              <li class={isFilterActive("game", k) && "is-active"} key={k}>
                <a href={createFilterUrl("game", k)}>{game.label}</a>
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
                {p.team ? <span class={[styles[p.team], styles.team]}></span> : <span class={[styles.noTeam, styles.team]}></span>}
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
