import { createContextId, Signal } from "@builder.io/qwik";

export const ThemeContext = createContextId<Signal<string>>("theme-context");
