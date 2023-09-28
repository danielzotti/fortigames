import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./event-program.module.scss";
import { supabaseClient } from "~/supabase/supabase-client";

interface AgendaParsed {
  activity: string | null;
  day: number | null;
  end: string | null;
  id: number;
  start: string | null;
  startTime: string;
  endTime: string;
}

export default component$(() => {
  const currentEvent = useSignal<AgendaParsed>();
  const nextEvents = useSignal<AgendaParsed[]>();

  useVisibleTask$(async () => {
    const { data } = await supabaseClient
      .from("agenda")
      .select()
      .order("start", { ascending: true });

    const parsed: AgendaParsed[] | undefined = data?.map((e) => {
      return {
        ...e,
        ...{
          startTime: e.start
            ? new Date(e.start).getHours() +
              ":" +
              String(new Date(e.start).getMinutes()).padStart(2, "0")
            : "",
          endTime: e.end
            ? new Date(e.end).getHours() +
              ":" +
              String(new Date(e.end).getMinutes()).padStart(2, "0")
            : "",
        },
      };
    });

    currentEvent.value = parsed?.find((e) => {
      return (
        new Date(e.start || "").getTime() < new Date().getTime() &&
        new Date(e.end || "").getTime() > new Date().getTime()
      );
    });

    nextEvents.value = parsed?.filter((e) => {
      return new Date(e.start || "").getTime() > new Date().getTime();
    });
  });

  // <Link href={`${config.urls.info}#agenda`}>Programma</Link>
  return (
    <div class={[styles.programContainer]}>
      <div class={[styles.eventLabelContainer]}>
        <div>
          <span class={[styles.label]}>Adesso</span>
        </div>
        <div>
          <span class={[styles.label]}>A seguire</span>
        </div>
      </div>
      <div class={styles.eventsContainer}>
        <div class={[styles.event]}>
          <div>
            {currentEvent.value ? (
              <>
                <div class={styles.time}>h {currentEvent.value.startTime}</div>
                <div class="event-name">{currentEvent.value.activity}</div>
              </>
            ) : (
              <div><br />In attesa dell'evento...</div>
            )}
          </div>
        </div>
        <div class={[styles.event]}>
          <div>
            {nextEvents.value?.length ? (
              <>
                <div class={styles.time}>h {nextEvents.value[0].startTime}</div>
                <div class="event-name">{nextEvents.value[0].activity}</div>
              </>
            ) : (
              <div>Non ci sono altri eventi :(</div>
            )}
          </div>
        </div>
        <div class={[styles.eventLast]}>
          <div>
            {nextEvents.value?.length &&
            nextEvents.value?.length &&
            nextEvents.value.length > 1 ? (
              <>
                <div class={styles.time}>h {nextEvents.value[1].startTime}</div>
                <div class="event-name">{nextEvents.value[1].activity}</div>
              </>
            ) : (
              <div>Non ci sono altri eventi :(</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
