import { useContext } from "react";
import { ThemeContext } from "@/context/theme";

const ThemeSelector = () => {
  const theme = useContext(ThemeContext);

  return <div>{theme}</div>;
};

export default ThemeSelector;
