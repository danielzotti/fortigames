import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import styles from "./index.module.scss";
import { CompanyValues, Participant } from "~/types/participant.types";
import BackTopButton from "~/shared/components/ui/back-top-button/back-top-button";
import { useParticipants } from "~/hooks/useParticipants";
import CompanyLogo from "~/shared/components/ui/company-logo/company-logo";

export default component$(() => {
  const containerRef = useSignal<HTMLElement>();
  const { participantsList, store } = useParticipants();

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
          Qui un elenco di giochi disponibili durante fortigames:
        </p>
        <h4>Impegno alto</h4>
        <ul>
          <li>Magic the gathering, cards</li>
          <li>Lorenzo il magnifico</li>
          <li>Puerto rico</li>
          <li>Mice and Mystics</li>
        </ul>
        <h4>Medio Impegno</h4>
        <ul>
          <li>Stratego</li>
          <li>Hive</li>
          <li>Santorini</li>
          <li>Backgammon</li>
          <li>Dead of winter</li>
          <li>Zombicide</li>
          <li>Furnace</li>
          <li>Illuminati</li>
        </ul>
        <h4>Easy/Party</h4>
        <ul>
          <li>Masquerade</li>
          <li>Hanabi</li>
          <li>Dixit</li>
          <li>Saboteur</li>
          <li>Time bomb</li>
          <li>exploding kittens</li>
          <li>stay away</li>
        </ul>
        
        <h3>Suggerimenti per i giochi da portare</h3>
        <p>non portare giochi per cui serva studiare le regole per ore</p>
        <p>non portare giochi che durano più di 90 minuti</p>
        <p>
          porta giochi che conosci e che sei in grado di spiegare agli altri in 10 minuti
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
                <td>
                  <div class={styles.name}>
                    <CompanyLogo company={p.company as CompanyValues} />
                    <span>{p.firstname}</span>
                    <span>{p.lastname}</span>
                  </div>
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
              </tr>
            ))}
        </table>
      </div>
      <BackTopButton ref={containerRef} />
    </MainLayout>
  );
});
