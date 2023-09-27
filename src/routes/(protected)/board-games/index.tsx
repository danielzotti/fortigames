import {component$, useSignal, useVisibleTask$} from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import styles from "./index.module.scss";
import {Participant} from "~/types/participant.types";
import {supabaseClient} from "~/supabase/supabase-client";

export default component$(() => {
    const people = useSignal<Array<Participant> | null>();

    useVisibleTask$(async () => {
        console.log("useVisibleTask$");

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

      <div class="boardgame">
      <h2>Chi può partecipare</h2>
      <p>Tutti possono giocare, sia quelli che sono iscritti alle gare, sia quelli che non vi partecipano.</p>
      <h2>Quando si gioca?</h2>
      <p>Si gioca durante le gare, per chi non partecipa, o chi vuole fare una pausa dalla gara. 
        Inoltre cercheremo di riunirci per giocare liberamente, nel tempo rimanente dagli impegni.
        </p>
      <h2>A cosa si gioca?</h2>
      <p>questo è un elenco di giochi disponibili, ma puoi portare il tuo se preferisci</p>
      <ul>
        <li>elenco</li>
      </ul>
      <h2>Suggerimenti per i giochi</h2>
      <p>non portare giochi per cui serva studiare le regole per ore</p>
      <p>non portare giochi che si giocano in dai 9 minuti in su</p>
      <p>porta giochi che conosci e che sei in grado di spiegare agli altri nel giro di 10 minuti</p>
      <p>se vuoi portare un gioco che non conosci, assicurati che qualcuno lo conosca o che il tempo di apprendimento sia veloce
      </p>
      <p><a href="#">chat</a></p>
      <p><a href="#">giocoteca</a></p>
      </div>


        <h2>Lista giochi</h2>
        Trovi <a href="https://docs.google.com/spreadsheets/d/1bHBQ89PyXy7j_EPEGyFHJHMcR01Q2Mb4Ur5uPgI5MLo/edit?usp=sharing" target="_blank">QUI</a> l'elenco dei giochi.
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
