import { component$ } from "@builder.io/qwik";
import { CompanyValues } from "~/types/participant.types";
import BitrockLogo from "../../../../../public/static/images/bitrock.png?jsx";
import RadicalbitLogo from "../../../../../public/static/images/radicalbit.png?jsx";
import ProactivityLogo from "../../../../../public/static/images/proactivity.png?jsx";
import FortitudeLogo from "../../../../../public/static/images/fortitude.png?jsx";

interface Props {
  company: CompanyValues | null;
  width?: string;
}

export default component$(({ company = null, width = "20px" }: Props) => {
  const getCompanyLogo = (company: CompanyValues) => {
    switch (company) {
      case "Bitrock":
        return <BitrockLogo style={{ width }} />;
      case "Radicalbit":
        return <RadicalbitLogo style={{ width }} />;
      case "ProActivity":
        return <ProactivityLogo style={{ width }} />;
      case "Fortitude":
        return <FortitudeLogo style={{ width }} />;
    }
  };
  return company ? getCompanyLogo(company) : null;
});
