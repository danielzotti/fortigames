import { $, useVisibleTask$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { config } from "~/config";
import { AuthSession } from "~/types/auth.types";
import { useAuth } from "~/hooks/useAuth";

export function useCheckSession() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const isTokenExpired = $(({ expires_at }: AuthSession) => {
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
      const token: AuthSession = JSON.parse(tokenString);
      if (await isTokenExpired(token)) {
        return null;
      }
      return token;
    } catch (e) {
      return null;
    }
  });

  useVisibleTask$(async () => {
    if (auth.value) {
      return;
    }
    const token = await getSessionFromLocalStorage();
    if (!token) {
      navigate(config.urls.login);
      return;
    }
    auth.value = token;
  });

  return auth;
}
