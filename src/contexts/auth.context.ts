import { createContextId, Signal } from "@builder.io/qwik";
import { AuthSession } from "~/types/auth.types";

export const AuthContext =
  createContextId<Signal<AuthSession | undefined>>("auth-context");
