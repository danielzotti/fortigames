import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import { supabaseClient } from "~/supabase/supabase-client";
import Button from "~/shared/components/ui/button/button";
import styles from "./index.module.scss";
import BackTopButton from "~/shared/components/ui/back-top-button/back-top-button";
import { Agenda } from "~/types/agenda.types";
import LocationMap from "~/shared/components/ui/location-map/location-map";

export default component$(() => {
  const containerRef = useSignal<HTMLElement>();
  const agenda = useSignal<Agenda | null>();

  useVisibleTask$(async () => {
    const { data } = await supabaseClient
      .from("agenda")
      .select()
      .order("start", { ascending: true });
    agenda.value = data;
  });

  return (
    <MainLayout title="Info" ref={containerRef}>
      <div class={styles.container}>
        <div class={styles.localNavigation}>
          <Button isLink={true} href="#agenda">
            Agenda
          </Button>
          <Button isLink={true} href="#location">
            Location
          </Button>
          <Button isLink={true} href="#torneo">
            Torneo
          </Button>
        </div>
        <h2 id="agenda">Agenda Convention</h2>
        <h3>Venerdì 29</h3>
        {agenda.value?.map((e) => (
          <div key={e.id} class="agenda-item">
            <div class="agenda-item-time">
              {e.start
                ? new Date(e.start).getHours() +
                  ":" +
                  String(new Date(e.start).getMinutes()).padStart(2, "0")
                : ""}
              {e.end
                ? "-" +
                  new Date(e.end).getHours() +
                  ":" +
                  String(new Date(e.end).getMinutes()).padStart(2, "0")
                : ""}
            </div>
            <div class="agenda-item-text"> {e.activity}</div>
          </div>
        ))}

        <h3>Sabato 30</h3>
        <div class="agenda-item">
          <div class="agenda-item-time">MAX 11:00</div>
          <div class="agenda-item-text">Check-out</div>
        </div>

        <h2 id="location">Location</h2>
        <p>
          <strong>West Garda Hotel</strong>
          <br />
          Via Prais 32, 25080 Padenghe sul Garda (BS) Italy
          <br />
          West Garda Hotel si trova nel comune di Padenghe sul Garda a 5 km dal
          casello autostradale di Desenzano
        </p>
        <p>
          <a href="https://westgardahotel.com/location/" target="_blank">
            Sito Hotel
          </a>{" "}
          &nbsp; GPS: 45°29’50.9″N 10°30’17.6″E
        </p>
        <LocationMap />
        <h3>Come raggiungere l'Hotel</h3>
        <h4>Auto</h4>
        <p>
          Autostrada A4 – uscita Desenzano del Garda – Seguire la S.S.
          Desenzano-Salò per 5 km – Arrivati a Padenghe Sul Garda, alla prima
          rotonda tenendo la sinistra si imbocca Via Prais che porta
          all’albergo.
        </p>
        <h4>Treno</h4>
        <p>
          Fermata alla stazione di Desenzano del Garda, linea Mi-Ve che dispone
          di un ottimo servizo taxi (10 minuti dall’hotel)
        </p>
        <h4>Aereo</h4>
        <p>
          Vicino all’hotel ci sono gli aeroporti G. D’Annunzio di Brescia
          Montichiari (25 km) e Valerio Catullo di Verona Villafranca (40 Km)
        </p>

        <h2 id="torneo">Il torneo</h2>
        <p>
          Questo torneo comprende tre diverse discipline: calcio, pallavolo e
          ping pong. Ognuna di queste discipline è parte integrante del torneo e
          determinerà il vincitore generale.
        </p>

        <h3>Condizioni di Vincita</h3>
        <p>
          Per vincere il torneo, una squadra deve avere la migliore performance
          complessiva nelle tre discipline. Ecco come funzionano le condizioni
          di vittoria:
        </p>
        <p>esempio:</p>
        <ul>
          <li>
            La squadra dei Dragons ha vinto la disciplina del calcio (1 punto).
          </li>
          <li>
            La squadra dei Tigers ha vinto le discipline del ping pong e della
            pallavolo (2 punti).
          </li>
          <li>
            Di conseguenza, il torneo è stato vinto dai Dragons grazie alla loro
            vittoria nel calcio.
          </li>
        </ul>

        <h3>Calcolo Punteggi</h3>
        <p>
          Vediamo di seguito come vengono calcolati i punteggi in ciascuna
          disciplina.
        </p>
        <h4>Calcio</h4>
        <p>
          la partita dura 2 ore e il vincitore è determinato dal numero di gol
          segnati. L'arbitro assegna "+1" per ogni gol segnato. Il risultato
          finale è basato sul numero di gol segnati:
        </p>
        <p>esempio:</p>
        <ul>
          <li>
            Dragons 8 gol - Tigers 4 gol: I Dragons vincono la partita di
            calcio.
          </li>
        </ul>
        <h4>Pallavolo</h4>
        <p>
          La partita di pallavolo dura 2 ore e il vincitore è chi vince più set,
          ciascuno a 25 punti. L'arbitro assegna "+1" per ogni set vinto. Il
          risultato finale è basato sul numero di set vinti:
        </p>
        <p>esempio:</p>
        <ul>
          <li>
            Dragons 2 set - Tigers 4 set: I Tigers vincono la partita di
            pallavolo.
          </li>
        </ul>
        <h4>Ping pong</h4>
        <p>
          Nel ping pong, la partita dura 2 ore e il vincitore è chi vince più
          set, ciascuno a 21 punti. L'arbitro assegna "+1" per ogni set vinto.
          Il risultato finale è basato sul numero di set vinti:
        </p>
        <p>esempio:</p>
        <ul>
          <li>
            Dragons 3 set - Tigers 7 set: I Tigers vincono la partita di ping
            pong.
          </li>
          <li>(Un set nel ping pong è la partita tra Bruno e Chiarello)</li>
        </ul>
      </div>
      <BackTopButton ref={containerRef} />
    </MainLayout>
  );
});
