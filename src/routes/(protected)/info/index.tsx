import { component$ } from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";

export default component$(() => {
  return (
    <MainLayout title="Info">
      <h2>Location</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
        aliquam, dicta et exercitationem facere ipsum officia officiis provident
        qui, quo quos reiciendis rerum tenetur. Cumque magni nihil quae
        voluptate voluptatem.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
        aliquam, dicta et exercitationem facere ipsum officia officiis provident
        qui, quo quos reiciendis rerum tenetur. Cumque magni nihil quae
        voluptate voluptatem.
      </p>
      <h2>Comportamento</h2>
      <p>testo</p>

      <h2>Calcolo Punteggi</h2>
      <h3>Calcio</h3>
      <p>
        La partita dura 2 ore e vince la partita chi segna più gol L’arbitro
        segna “+1” a ogni gol Il risultato finale sarà in base ai gol: Dragons 8
        gol - Tigers 4 gol: vincono i Dragons
      </p>
      <h3>Pallavolo</h3>
      <p>
        La partita dura 2 ore e vince la partita chi vince più set (a 25 punti)
        L’arbitro segna “+1" a ogni SET vinto Il risultato finale sarà in base
        ai set: Dragons 2 set - Tigers 4 set: vincono i Tigers
      </p>
      <h3>Ping pong</h3>
      <p>
        La partita dura 2 ore e vince la partita chi vince più set (a 21 punti)
        L’arbitro segna “+1” a ogni SET vinto (ES: Bruno 21 - Chiarello 18,
        vince il set Bruno ed è “+1" per i Dragons) Il risultato finale sarà in
        base ai set vinto: Dragons 3 set - Tigers 7 set: vincono i Tigers (Il
        set nel ping pong è la partita tra Bruno e Chiarello)
      </p>

      <h2>Condizioni di Vittoria</h2>
      <p>
        I Dragons hanno vinto calcio (1), i Tigers hanno vinto ping pong e
        pallavolo (2) <i class="fa-solid fa-arrow-right"></i> Il torneo lo
        vincono i Dragons
      </p>
    </MainLayout>
  );
});
