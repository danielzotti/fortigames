import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { supabaseClient } from "~/supabase/supabase-client";
import { Participant } from "~/types/participant.types";
import { useLocation } from "@builder.io/qwik-city";
import { config } from "~/config";

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
    <>
      <h1>Teams</h1>
      <ul class="teams-list">
        <li>
          <a href={createFilterUrl("team", null)}>All</a>
        </li>
        {Object.keys(config.teams).map((k) => (
          <li class={isFilterActive("team", k) && "is-active"} key={k}>
            <a href={createFilterUrl("team", k)}>{config.teams[k].label}</a>
          </li>
        ))}
      </ul>
      GAMES
      <ul class="teams-games">
        <li>
          <a href={createFilterUrl("game", null)}>All</a>
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
      <table class="teams-member-list">
        {people.value &&
          people.value.map((p) => (
            <tr key={p.id}>
              <td>{p.number || "ND"}</td>
              <td>
                {p.firstname} {p.lastname} ({p.company})
              </td>
              <td>
                {p.is_playing_soccer ? <i class="fa fa-soccer-ball"></i> : ""}
              </td>
              <td>
                {p.is_playing_volley ? (
                  <i class="fa fa-volleyball-ball"></i>
                ) : (
                  ""
                )}
              </td>
              <td>
                {p.is_playing_pingpong ? (
                  <i class="fa fa-table-tennis-paddle-ball"></i>
                ) : (
                  ""
                )}
              </td>
              <td>
                {p.is_playing_boardgames ? (
                  <i class="fa fa-chess-rook"></i>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
      </table>
    </>
  );
});
