import { Session } from "supabase-auth-helpers-qwik";
import { TeamsValues } from "~/types/teams.types";

export type AuthSession = Session & {
  is_admin?: boolean;
  is_fortitude?: boolean;
  is_referee?: boolean;
  is_facilitator?: boolean;
  team?: TeamsValues;
  firstname?: string | null;
  lastname?: string | null;
  is_playing_soccer?: boolean | null;
  is_playing_pingpong?: boolean | null;
  is_playing_volley?: boolean | null;
  is_playing_boardgames?: boolean | null;
};
