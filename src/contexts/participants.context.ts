import { createContextId, Signal } from "@builder.io/qwik";
import { ParticipantsStore } from "~/types/participant.types";

export const ParticipantsContext = createContextId<ParticipantsStore>(
  "participants-context",
);
