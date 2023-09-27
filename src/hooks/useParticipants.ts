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
  const participants = useContext(ParticipantsContext);
  const participantsList = useComputed$<Participant[]>(() => {
    return Object.values(participants).filter((p) => !!p.team);
  });

  const participantByEmail = $((email: string) => participants[email]);

  useVisibleTask$(({ track }) => {});

  const initializeContext = $(async () => {
    const { data } = await supabaseClient.from("users").select("*");
    if (data?.length) {
      Object.entries(data).forEach(([key, value]) => {
        participants[value.email] = value;
      });
    }

    supabaseClient
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "users" },
        (payload: RealtimePostgresUpdatePayload<Participant>) => {
          participants[payload.new.email] = payload.new;
        },
      )
      .subscribe();
  });

  return {
    initializeContext,
    participants,
    participantByEmail,
    participantsList,
  };
};
