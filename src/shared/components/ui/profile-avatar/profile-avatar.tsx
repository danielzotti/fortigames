import { component$, useContext } from "@builder.io/qwik";
import styles from "./profile-avatar.module.scss";
import { useNavigate } from "@builder.io/qwik-city";
import { config } from "~/config";
import { AuthContext } from "~/routes/layout";

export default component$(() => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const getUserInitialLetters = () => {
    const fullNameList = auth.value?.user.email?.split("@")?.[0]?.split(".");
    if (!fullNameList?.length) {
      return <i class="fa fa-user"></i>;
    }
    const fistNameLetter = fullNameList[0]?.[0]?.toUpperCase();
    const lastNameLetter = fullNameList[1]?.[0]?.toUpperCase();

    return `${fistNameLetter}${lastNameLetter}`;
  };

  return (
    <button
      onClick$={() => navigate(config.urls.profile)}
      class={styles.profile}
    >
      {getUserInitialLetters()}
    </button>
  );
});
