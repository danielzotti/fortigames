import { component$ } from "@builder.io/qwik";
import styles from "./back-button.module.scss";
import { useNavigate } from "@builder.io/qwik-city";
import Button from "~/shared/components/ui/button/button";

interface Props {
  url: string;
}

export default component$(({ url }: Props) => {
  const navigate = useNavigate();

  return (
    <Button onClick$={() => navigate(url)}>
      <i class="fa fa-chevron-left"></i>
    </Button>
  );
});
