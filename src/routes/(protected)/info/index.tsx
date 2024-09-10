import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import { supabaseClient } from "~/supabase/supabase-client";
import Button from "~/shared/components/ui/button/button";
import styles from "./index.module.scss";
import BackTopButton from "~/shared/components/ui/back-top-button/back-top-button";
import { Agenda } from "~/types/agenda.types";
import LocationMap from "~/shared/components/ui/location-map/location-map";
import { Link } from "@builder.io/qwik-city";

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
        <h3>Venerdì 4 Ottobre</h3>
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
        <h3>Sabato 5 Ottobre</h3>
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
        <Link href={"https://westgardahotel.com/location/"} target="_blank">
            Sito Hotel
          </Link>
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
          Due squadre, Tigers e Dragons si affronteranno in tre competizioni sportive: Calcio a 5, Volley, Ping Pong.
        </p>
        <p>
          Sarà decretata vincitrice del torneo la squadra che avrà vinto almeno
          due competizioni.
        </p>
        <h4>Premio</h4>
        <p>
          La squadra vincitrice riceverà in premio la preziosa <Link href={"/public/static/images/taoScimmiaMaya.jpg"} target="_blank">Tao-scimmia
          Maya</Link>, il capolavoro del maestro Gianluca La Rosa in copia unica.
        </p>
        <h4>Durata</h4>
        <p>
          Il torneo inizierà alle 17:30, o comunque dopo le presentazioni e si
          concluderà tassativamente alle 19:20 per consentire alle eventuali
          sfide in parità di concludersi secondo le modalità sottoindicate e di
          prepararsi per la cena.
        </p>
        <p>
          <Button
            isLink={true}
            href="/public/static/documents/RegolamentoTorneo.pdf"
            target="_blank"
          >
            Scarica il regolamento completo
          </Button>
        </p>
        <h4>Calcio</h4>
        <p>
          Si sfideranno due squadre composte da 9 giocatori, 5 in campo e 4
          riserve.
          <br />
          Le squadre sono libere di decidere se tenere il portiere fisso o se
          effettuare una rotazione per questo ruolo.
          <br />
          Ogni 10 minuti ci saranno 2 sostituzioni.
          <br />
          Vincerà la squadra che alle 19:20 avrà segnato più gol; in caso di
          parità si procederà con i calci di rigore (5 ed eventualmente ad
          oltranza).
        </p>
        <h4>Volley</h4>
        <p>
          Si sfideranno due squadre composte da 13 giocatori, 6 in campo e 7
          riserve.
          <br />
          Le squadre sono libere di ruotare nelle varie posizioni o di mantenere
          posizioni fisse.
          <br />
          Ogni 10 minuti ci saranno 4 sostituzioni.
          <br />
          Vincerà la squadra che alle 19:20 avrà vinto più set (al meglio dei 25
          punti); in caso di parità si procederà al tie break (al meglio dei 15
          punti)
        </p>
        <h4>Ping pong</h4>
        <p>
          Si sfideranno due squadre composte da 14 giocatori.
          <br />
          Ci saranno 14 sfide al meglio dei 21 punti.
          <br />
          Si potranno giocare 2 sfide contemporaneamente vista la presenza di
          due tavoli.
          <br />
          Vincerà la squadra che alle 19:20 avrà vinto più sfide; in caso di
          parità si procederà con una sfida secca, ogni squadra sceglierà chi
          schierare per lo spareggio.
        </p>
        <h3>Facilitatori</h3>
        <p>
          Ogni competizione avrà un facilitatore, questi avrà il compito di:
        </p>
        <ul>
          <li>verificare il corretto svolgimento dei giochi</li>
          <li>
            segnalare eventuali comportamenti scorretti (falli, provocazioni
            gratuite, insulti, ecc) che saranno sanzionati con il cartellino
            giallo (ammonizione) o rosso (espulsione) secondo il suo
            insindacabile giudizio; un doppio cartellino giallo porterà al
            cartellino rosso e all’espulsione
          </li>
          <li>conteggiare i gol/punti</li>
        </ul>
        <p>Il facilitatore della partita di calcio a 5 dovrà inoltre:</p>
        <ul>
          <li>
            chiamare il cambio ogni 10 minuti tramite avvisatore acustico
            (fischietto o voce) e verificare che le sostituzioni siano
            effettuate
          </li>
          <li>appuntare il nome dei marcatori</li>
        </ul>
        <p>Il facilitatore della partita di volley dovrà inoltre:</p>
        <ul>
          <li>
            chiamare il cambio ogni 10 minuti tramite avvisatore acustico
            (fischietto o voce) e verificare che le sostituzioni siano
            effettuate
          </li>
        </ul>
      </div>
      <BackTopButton ref={containerRef} />
    </MainLayout>
  );
});
