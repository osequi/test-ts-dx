import { breakpoints, breakpointNames } from ".";

it("All breakpoints are defined.", () => {
  expect(breakpoints.length).toBe(breakpointNames.length);
});

it("It's defined.", () => {
  expect(breakpoints).not.toBeNull();
});
