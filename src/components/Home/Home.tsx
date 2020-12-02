import React from "react";
import { useBreakpoint } from "@hooks";
import HomeMdx from "./Home.mdx";

const Home = () => {
  const breakpoints = useBreakpoint("mobile");

  return (
    <>
      {breakpoints}
      <HomeMdx />
    </>
  );
};

export default Home;
