import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import styles from "./index.module.scss";
import { Participant } from "~/types/participant.types";
import { supabaseClient } from "~/supabase/supabase-client";

export default component$(() => {
  const people = useSignal<Array<Participant> | null>();

  useVisibleTask$(async () => {
    const client = supabaseClient
      .from("users")
      .select("*")
      .is("has_filled_form", true)
      .is("is_playing_boardgames", true);

    const { data: participantList } = await client;
    people.value = participantList;
  });
  return (
    <MainLayout title="Board games">
      <h1>Lista giochi</h1>
      Trovi{" "}
      <a
        href="https://docs.google.com/spreadsheets/d/1bHBQ89PyXy7j_EPEGyFHJHMcR01Q2Mb4Ur5uPgI5MLo/edit?usp=sharing"
        target="_blank"
      >
        QUI
      </a>{" "}
      l'elenco dei giochi.
      <h1>Giocatori</h1>
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
