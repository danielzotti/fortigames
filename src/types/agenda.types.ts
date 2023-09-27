import { Database } from "~/types/database.types";

export type Agenda = AgendaRow[];
export type AgendaRow = Database["public"]["Tables"]["agenda"]["Row"];
