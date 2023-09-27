import { component$ } from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";

export default component$(() => {
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
    </MainLayout>
  );
});
