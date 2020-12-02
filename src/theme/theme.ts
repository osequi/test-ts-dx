import type { TBreakpoint } from "./breakpoints";
import { breakpoints } from "./breakpoints";

interface TTheme {
  breakpoints: TBreakpoint[];
}

const theme: TTheme = {
  breakpoints: breakpoints,
};

export default theme;
export type { TBreakpoint };
