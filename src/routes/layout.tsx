import {
  component$,
  createContextId,
  Signal,
  Slot,
  useContextProvider,
  useSignal,
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

export const AuthContext =
  createContextId<Signal<Session | undefined>>("auth-contenxt");

export default component$(() => {
  useStyles$(variablesCss);
  useStyles$(fontawesome);
  useStyles$(fontawesomeBrands);
  useStyles$(fontawesomeSolid);

  const auth = useSignal<Session | undefined>();
  useContextProvider(AuthContext, auth);

  return (
    <>
      <main>
        <Slot />
      </main>
    </>
  );
});
