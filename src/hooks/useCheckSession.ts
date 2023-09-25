import { $, useContext, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { config } from "~/config";
import { Session } from "supabase-auth-helpers-qwik";
import { AuthContext } from "~/contexts/auth.context";

export function useCheckSession() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const isTokenExpired = $(({ expires_at }: Session) => {
    if (!expires_at) {
      return false;
    }
    return new Date() >= new Date(expires_at * 1000);
  });

  const getSessionFromLocalStorage = $(async () => {
    try {
      const tokenString = localStorage.getItem(config.jwtTokenLocalStorageName);

      if (!tokenString) {
        return null;
      }
      const token: Session = JSON.parse(tokenString);
      if (await isTokenExpired(token)) {
        return null;
      }
      return token;
    } catch (e) {
      return null;
    }
  });

  useVisibleTask$(async () => {
    console.log("check session...");
    if (
      location.url.pathname.startsWith(config.urls.auth) ||
      location.url.pathname.startsWith(config.urls.login)
    ) {
      return;
    }

    if (auth.value) {
      return;
    }
    const token = await getSessionFromLocalStorage();
    if (!token) {
      navigate(config.urls.login);
      return;
    }
    auth.value = token;
    // await navigate(config.urls.home);
  });

  return auth;
}
