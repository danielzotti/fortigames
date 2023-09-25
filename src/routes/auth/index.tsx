import { component$, useContext, useVisibleTask$ } from "@builder.io/qwik";
import { getSessionFromHash } from "~/shared/utils/auth";
import { config } from "~/config";
import { useNavigate } from "@builder.io/qwik-city";
import { AuthContext } from "~/contexts/auth.context";

export default component$(() => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useVisibleTask$(async () => {
    const session = getSessionFromHash(window.location.hash);

    if (!session) {
      console.log("error with JWT");
      return;
    }
    localStorage.setItem(
      config.jwtTokenLocalStorageName,
      JSON.stringify(session),
    );
    auth.value = session;
    await navigate(config.urls.home);
  });

  return <p>Checking JWT... Do not refresh page!</p>;
});
