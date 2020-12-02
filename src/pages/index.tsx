import React, { createContext, Context } from "react";
import { theme } from "@theme";
import { Home } from "@components/Home";

import "normalize.css";

const ThemeContext: Context<any> = createContext(null);

const HomePage = () => {
  return (
    <ThemeContext.Provider value={theme}>
      <Home />
    </ThemeContext.Provider>
  );
};

export default HomePage;
export { ThemeContext };
