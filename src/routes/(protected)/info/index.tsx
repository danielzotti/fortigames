import {component$, useSignal, useVisibleTask$} from "@builder.io/qwik";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import {supabaseClient} from "~/supabase/supabase-client";
import {Database} from "~/types/database.types";

export default component$(() => {
    const agenda = useSignal<Database["public"]["Tables"]["agenda"]["Row"][] | null>();

    useVisibleTask$(async () => {
        const {data} = await supabaseClient
            .from("agenda")
            .select()
            .order('start', {ascending: true})
        agenda.value = data;
    });

    return (
        <MainLayout title="Info">
            
            <h2 id="agenda">Agenda Convention</h2>
            <h3>Venerdì 29</h3>
            {agenda.value?.map(e => (
                <div key={e.id} class="agenda-item">
                    <div class="agenda-item-time">
                        {e.start ? new Date(e.start).getHours() + ":" + String(new Date(e.start).getMinutes()).padStart(2, "0") : ""}
                        {e.end ? "-" + new Date(e.end).getHours() + ":" + String(new Date(e.end).getMinutes()).padStart(2, "0") : ""}
                    </div>
                    <div class="agenda-item-text"> {e.activity}</div>
                </div>
            ))}

            <h3>Sabato 30</h3>
            <div class="agenda-item">
                    <div class="agenda-item-time">H 11</div> 
                    <div class="agenda-item-text">Check-out</div>
            </div>

            <h2 id="Location">Location</h2>
            <p>
                <strong>West Garda Hotel</strong><br/>
                Via Prais 32, 25080 Padenghe sul Garda (BS) Italy<br/>
                West Garda Hotel si trova nel comune di Padenghe sul Garda a 5 km dal casello autostradale di Desenzano
            </p>
            <p>
                <a href="https://westgardahotel.com/location/" target="_blank">Sito Hotel</a> &nbsp;
                <a href="https://maps.app.goo.gl/T23BwGW6LLdEnC5Y8" target="_blank">Apri Maps</a> &nbsp; GPS: 45°29’50.9″N 10°30’17.6″E
            </p>
            <h3>Come raggiungere l'Hotel</h3>
            <h4>Auto</h4>
            <p>
            Autostrada A4 – uscita Desenzano del Garda – Seguire la S.S. Desenzano-Salò per 5 km – Arrivati a Padenghe Sul Garda, alla prima rotonda tenendo la sinistra si imbocca Via Prais che porta all’albergo.
            </p>
            <h4>Treno</h4>
            <p>
            Fermata alla stazione di Desenzano del Garda, linea Mi-Ve che dispone di un ottimo servizo taxi (10 minuti dall’hotel)
            </p>
            <h4>AEREO</h4>
            <p>
            Vicino all’hotel ci sono gli aeroporti G. D’Annunzio di Brescia Montichiari (25 km) e Valerio Catullo di Verona Villafranca (40 Km)
            </p>

            
            <h2 id="torneo">Il torneo</h2>

            <h3>Condizioni di Vincita</h3>
            <p>
                I Dragons hanno vinto calcio (1), i Tigers hanno vinto ping pong e
                pallavolo (2) <i class="fa-solid fa-arrow-right"></i> Il torneo lo
                vincono i Dragons
            </p>

            <h3>Calcolo Punteggi</h3>
            <h4>Calcio</h4>
            <p>
                La partita dura 2 ore e vince la partita chi segna più gol L’arbitro
                segna “+1” a ogni gol Il risultato finale sarà in base ai gol: Dragons 8
                gol - Tigers 4 gol: vincono i Dragons
            </p>
            <h4>Pallavolo</h4>
            <p>
                La partita dura 2 ore e vince la partita chi vince più set (a 25 punti)
                L’arbitro segna “+1" a ogni SET vinto Il risultato finale sarà in base
                ai set: Dragons 2 set - Tigers 4 set: vincono i Tigers
            </p>
            <h4>Ping pong</h4>
            <p>
                La partita dura 2 ore e vince la partita chi vince più set (a 21 punti)
                L’arbitro segna “+1” a ogni SET vinto (ES: Bruno 21 - Chiarello 18,
                vince il set Bruno ed è “+1" per i Dragons) Il risultato finale sarà in
                base ai set vinto: Dragons 3 set - Tigers 7 set: vincono i Tigers (Il
                set nel ping pong è la partita tra Bruno e Chiarello)
            </p>

            <h3>Il trofeo</h3>
        </MainLayout>
    );
});
