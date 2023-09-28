import { useContext, useVisibleTask$ } from "@builder.io/qwik";
import { AuthContext } from "~/contexts/auth.context";

export const useAuth = () => {
  const auth = useContext(AuthContext);
  const user = auth.value?.user;
  const isAdmin = auth.value?.is_admin;
  const isFacilitator = auth.value?.is_facilitator;
  const isReferee = auth.value?.is_referee;
  const team = auth.value?.team;
  const firstname = auth.value?.firstname;
  const lastname = auth.value?.lastname;
  const is_playing_pingpong = auth.value?.is_playing_pingpong;
  const is_playing_soccer = auth.value?.is_playing_soccer;
  const is_playing_volley = auth.value?.is_playing_volley;
  const is_playing_boardgames = auth.value?.is_playing_boardgames;

  return {
    user,
    isAdmin,
    isReferee,
    isFacilitator,
    auth,
    team,
    firstname,
    lastname,
    is_playing_pingpong,
    is_playing_soccer,
    is_playing_volley,
    is_playing_boardgames,
  };
};
