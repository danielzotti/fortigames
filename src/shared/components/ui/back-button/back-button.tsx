import { component$ } from "@builder.io/qwik";
import styles from "./back-button.module.scss";
import { useNavigate } from "@builder.io/qwik-city";

interface Props {
  url: string;
}

export default component$(({ url }: Props) => {
  const navigate = useNavigate();

  return (
    <button onClick$={() => navigate(url)} class={styles.backButton}>
      <i class="fa fa-arrow-left"></i>
      Back
    </button>
  );
});
