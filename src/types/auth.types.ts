import { Session } from "supabase-auth-helpers-qwik";

export type AuthSession = Session & {
  is_admin?: boolean;
  is_fortitude?: boolean;
};
