import type { TBreakpoint } from "./breakpoints";
import { breakpoints } from "./breakpoints";

interface theme {
  breakpoints: TBreakpoint[];
}

const theme = {
  breakpoints: breakpoints,
};

export default theme;
export type { TBreakpoint };
