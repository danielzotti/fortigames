import { component$, useContext, useVisibleTask$ } from "@builder.io/qwik";
import { getSessionFromHash } from "~/shared/utils/auth";
import { config } from "~/config";
import { useNavigate } from "@builder.io/qwik-city";
import { AuthContext } from "~/routes/layout";

export default component$(() => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useVisibleTask$(async () => {
    const session = getSessionFromHash(window.location.hash);

    console.log({ session });
    if (session) {
      localStorage.setItem(
        config.jwtTokenLocalStorageName,
        JSON.stringify(session),
      );
      auth.value = session;
      await navigate(config.urls.home);
    } else {
      console.log("error with JWT");
    }
  });

  if (!auth.value) {
    return <p>Loading JWT...</p>;
  }

  return (
    <>
      <h1>Auth</h1>
      <pre>{JSON.stringify(auth.value?.user, null, 2)}</pre>
    </>
  );
});
