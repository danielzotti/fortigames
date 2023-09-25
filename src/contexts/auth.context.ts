import { createContextId, Signal } from "@builder.io/qwik";
import { Session } from "supabase-auth-helpers-qwik";

export const AuthContext =
  createContextId<Signal<Session | undefined>>("auth-contenxt");
