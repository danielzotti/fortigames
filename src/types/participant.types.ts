import { Database } from "~/types/database.types";

export type Participant = Database["public"]["Tables"]["users"]["Row"];

export type ParticipantsStore = Record<string, Participant>;

export type CompanyValues =
  | "Bitrock"
  | "ProActivity"
  | "Radicalbit"
  | "Fortitude";
