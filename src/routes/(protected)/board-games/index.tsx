import {
  component$,
  useComputed$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import styles from "./index.module.scss";
import { Participant } from "~/types/participant.types";
import BackTopButton from "~/shared/components/ui/back-top-button/back-top-button";
import { useParticipants } from "~/hooks/useParticipants";

export default component$(() => {
  const containerRef = useSignal<HTMLElement>();
  const { participantsList, participants } = useParticipants();

  const people = useComputed$<Participant[]>(() => {
    const filteredList = participantsList.value.filter(
      (p) => p.is_playing_boardgames,
    );
    return [...filteredList].sort((a, b) => a.email.localeCompare(b.email));
  });

  return (
    <MainLayout title="Board games" ref={containerRef}>
      <div class="boardgame">
        <h2>Chi può partecipare e quando?</h2>
        <p>
          Tutti possono giocare, sia quelli che sono iscritti alle gare, sia
          quelli che non vi partecipano.
        </p>

        <p>
          Si gioca durante le gare, per chi non partecipa, o chi vuole fare una
          pausa dalla gara. Inoltre cercheremo di riunirci per giocare
          liberamente, nel tempo rimanente dagli impegni.
        </p>

        <h2>A cosa si gioca?</h2>
        <p>
          Qui sotto un elenco di giochi disponibili, puoi richiedere il gioco
          alle persone di riferimento, o portare il tuo, se preferisci mettiti
          d'accordo con i partecipanti, che trovi qui sotto, su cosa portare.
        </p>
        <p>
          {" "}
          <a
            href="https://docs.google.com/spreadsheets/d/1bHBQ89PyXy7j_EPEGyFHJHMcR01Q2Mb4Ur5uPgI5MLo/edit?usp=sharing"
            target="_blank"
          >
            lista completa
          </a>{" "}
        </p>

        <h3>Suggerimenti per i giochi da portare</h3>
        <p>non portare giochi per cui serva studiare le regole per ore</p>
        <p>non portare giochi che si giocano in dai 9 minuti in su</p>
        <p>
          porta giochi che conosci e che sei in grado di spiegare agli altri nel
          giro di 10 minuti
        </p>
        <p>
          se vuoi portare un gioco che non conosci, assicurati che qualcuno lo
          conosca o che il tempo di apprendimento sia veloce
        </p>

        <h2>Partecipanti</h2>
        <table class={styles.playersList}>
          {people.value &&
            people.value.map((p) => (
              <tr key={p.id}>
                {/*<td>{p.number || "ND"}</td>*/}
                <td>
                  <strong>
                    {p.firstname} {p.lastname}
                  </strong>
                  {/*{p.company}*/}
                </td>
                {/*<td>
                  {p.team ? (
                    <span class={[styles[p.team], styles.team]}></span>
                  ) : (
                    <span class={[styles.noTeam, styles.team]}></span>
                  )}
                </td>*/}
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
              </tr>
            ))}
        </table>
      </div>
      <BackTopButton ref={containerRef} />
    </MainLayout>
  );
});
