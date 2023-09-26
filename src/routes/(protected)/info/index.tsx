import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import { supabaseClient } from "~/supabase/supabase-client";
import { Database } from "~/types/database.types";

export default component$(() => {
  const agenda = useSignal<
    Database["public"]["Tables"]["agenda"]["Row"][] | null
  >();

  useVisibleTask$(async () => {
    const { data } = await supabaseClient
      .from("agenda")
      .select()
      .order("start", { ascending: true });
    agenda.value = data;
  });

  return (
    <MainLayout title="Info">
      <h2>Location</h2>
      <p>Padenghe sul Garda - West Garda Hotel</p>
      <a href="https://maps.app.goo.gl/T23BwGW6LLdEnC5Y8" target="_blank">
        Clicca qui per la mappa
      </a>

      <h2 id="agenda">Agenda</h2>
      <h3>Venerdì 29</h3>
      {agenda.value?.map((e) => (
        <div class="agenda-item" key={e.id}>
          <div class="agenda-item-time">
            {e.start
              ? new Date(e.start).getHours() +
                ":" +
                String(new Date(e.start).getMinutes()).padStart(2, "0")
              : ""}
            {e.end
              ? "- " +
                new Date(e.end).getHours() +
                ":" +
                String(new Date(e.end).getMinutes()).padStart(2, "0")
              : ""}
          </div>
          <div class="agenda-item-text">{e.activity}</div>
        </div>
      ))}

      <h3>Sabato 30</h3>
      <div class="agenda-item">
        <div class="agenda-item-time">Entro le 11</div>
        <div class="agenda-item-text">Check-out</div>
      </div>
      <div></div>
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
