import { $, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { type User } from "@supabase/supabase-js";
import { useNavigate } from "@builder.io/qwik-city";
import { config } from "~/config";
import { type JwtToken } from "~/types/auth.types";

export function useAuthUser() {
  const isTokenExpired = $(({ expires_at }: JwtToken) => {
    return new Date() >= new Date(expires_at * 1000);
  });

  const getAuthFromLocalStorageToken = $(async () => {
    try {
      const tokenString = localStorage.getItem(config.jwtTokenLocalStorageName);

      if (!tokenString) {
        return null;
      }
      const token: JwtToken = JSON.parse(tokenString);
      if (await isTokenExpired(token)) {
        return null;
      }
      return token;
    } catch (e) {
      return null;
    }
  });

  const user = useSignal<User | null>(null);

  const navigate = useNavigate();

  useVisibleTask$(() => {
    // TODO: Adding setTimeout is a trick to make the Supabase store the token in the localStorage
    // We should improve this part but for now it works
    // Plus. we are reading from localStorage on every request, we should implement a context!!!
    setTimeout(async () => {
      console.log("Reading from localStorage...");
      const token = await getAuthFromLocalStorageToken();
      if (!token) {
        navigate(config.urls.login);
        return;
      }
      user.value = token.user;
    }, 100);
  });

  return user;
}
