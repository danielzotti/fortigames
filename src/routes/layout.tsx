import {
  component$,
  createContextId,
  Signal,
  Slot,
  useContextProvider,
  useSignal,
  useStore,
  useStyles$,
} from "@builder.io/qwik";
import { routeLoader$, DocumentHead } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import variablesCss from "../scss/_variables-css.scss?inline";

import fontawesome from "@fortawesome/fontawesome-free/css/fontawesome.min.css?inline";
import fontawesomeBrands from "@fortawesome/fontawesome-free/css/brands.min.css?inline";
import fontawesomeSolid from "@fortawesome/fontawesome-free/css/solid.min.css?inline";

import { config } from "~/config";
import { Session } from "supabase-auth-helpers-qwik";
import { AuthContext } from "~/contexts/auth.context";
import { GamesResults } from "~/types/games.types";
import {
  GamesResultsContext,
  gamesResultsDefault,
} from "~/contexts/games-results.context";
import { ThemeContext } from "~/contexts/theme.context";
import { ParticipantsStore } from "~/types/participant.types";
import { ParticipantsContext } from "~/contexts/participants.context";
import { ConfigContext, configDefault } from "~/contexts/config.context";
import { Config } from "~/types/config.types";
import { AuthSession } from "~/types/auth.types";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export const head: DocumentHead = {
  links: [
    ...config.fontUrls.map((font) => ({
      rel: "stylesheet",
      href: font,
    })),
  ],
};

export default component$(() => {
  useStyles$(variablesCss);
  useStyles$(fontawesome);
  useStyles$(fontawesomeBrands);
  useStyles$(fontawesomeSolid);

  const auth = useSignal<AuthSession | undefined>();
  useContextProvider(AuthContext, auth);

  const config = useStore<Config>(configDefault);
  useContextProvider(ConfigContext, config);

  const theme = useSignal("light");
  useContextProvider(ThemeContext, theme);

  const gamesResults = useStore<GamesResults>(gamesResultsDefault);
  useContextProvider(GamesResultsContext, gamesResults);

  const participantsStore = useStore<ParticipantsStore>({});
  useContextProvider(ParticipantsContext, participantsStore);

  return (
    <>
      <main>
        <Slot />
      </main>
    </>
  );
});
