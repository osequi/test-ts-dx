/**
 * Defines the breakpoint names interface.
 */
export interface TBreakpointNames {
  name: "mobile" | "tablet" | "laptop" | "desktop";
}

/**
 * Defines the breakpoint interface.
 */
export interface TBreakpoint extends TBreakpointNames {
  /**
   * The breakpoint value in pixels.
   */
  value: number;
}

/**
 * Defines the breakpoints.
 */
const breakpoints: TBreakpoint[] = [
  { name: "mobile", value: 320 },
  { name: "tablet", value: 768 },
  { name: "laptop", value: 1280 },
  { name: "desktop", value: 1600 },
];

export default breakpoints;
