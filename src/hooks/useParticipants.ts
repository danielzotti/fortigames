import {
  $,
  useComputed$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { supabaseClient } from "~/supabase/supabase-client";
import { ParticipantsContext } from "~/contexts/participants.context";
import { RealtimePostgresUpdatePayload } from "@supabase/supabase-js";
import { Participant, ParticipantsStore } from "~/types/participant.types";

export const useParticipants = () => {
  const store = useContext(ParticipantsContext);
  const participantsList = useComputed$<Participant[]>(() => {
    return Object.values(store).filter((p) => !!p.team);
  });
  const usersList = useComputed$<Participant[]>(() => {
    return Object.values(store);
  });

  const boardgamersList = useComputed$<Participant[]>(() => {
    return Object.values(store).filter((u) => u.is_playing_boardgames);
  });

  const participantByEmail = $((email: string) => store[email]);

  useVisibleTask$(({ track }) => {});

  const initializeContext = $(async () => {
    const { data } = await supabaseClient.from("users").select("*");
    if (data?.length) {
      Object.entries(data).forEach(([key, value]) => {
        store[value.email] = value;
      });
    }

    supabaseClient
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "users" },
        (payload: RealtimePostgresUpdatePayload<Participant>) => {
          store[payload.new.email] = payload.new;
        },
      )
      .subscribe();
  });

  return {
    initializeContext,
    store,
    participantByEmail,
    participantsList,
    usersList,
    boardgamersList,
  };
};
