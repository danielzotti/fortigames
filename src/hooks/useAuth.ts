import { useContext, useVisibleTask$ } from "@builder.io/qwik";
import { AuthContext } from "~/contexts/auth.context";

export const useAuth = () => {
  const auth = useContext(AuthContext);
  const user = auth.value?.user;
  const isAdmin = auth.value?.is_admin;

  useVisibleTask$(async () => {});
  return {
    user,
    isAdmin,
    auth,
  };
};
