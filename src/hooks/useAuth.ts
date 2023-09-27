import { useContext, useVisibleTask$ } from "@builder.io/qwik";
import { AuthContext } from "~/contexts/auth.context";

export const useAuth = () => {
  const auth = useContext(AuthContext);
  const user = auth.value?.user;
  const isAdmin = auth.value?.is_admin;
  const isFacilitator = auth.value?.is_facilitator;
  const isReferee = auth.value?.is_referee;
  const team = auth.value?.team;

  return {
    user,
    isAdmin,
    isReferee,
    isFacilitator,
    auth,
    team,
  };
};
