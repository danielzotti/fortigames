import { Session } from "supabase-auth-helpers-qwik";
import jwtDecode from "jwt-decode";

export const getSessionFromHash = (hash: string): Session | null => {
  if (!hash) {
    return null;
  }

  const returnToken = Object.fromEntries(
    hash
      .substring(1, hash.length)
      .split("&")
      .map((h) => h.split("="))
      .map(([key, value]) => {
        return [
          key,
          ["expires_at", "expires_in"].includes(key) && value !== null
            ? +value
            : value,
        ];
      }),
  ) as unknown as Session;

  if (!(returnToken as Session).access_token) {
    return null;
  }
  return {
    ...returnToken,
    user: jwtDecode(returnToken.access_token),
  } as Session;
};
