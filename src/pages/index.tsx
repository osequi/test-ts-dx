import React, { createContext } from "react";
import { theme } from "@theme";
import { Home } from "@components/Home";

import "normalize.css";

const ThemeContext = createContext(null);

const HomePage = () => {
  return (
    <ThemeContext.Provider value={theme}>
      <Home />
    </ThemeContext.Provider>
  );
};

export default HomePage;
export { ThemeContext };
