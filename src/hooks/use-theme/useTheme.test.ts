import { useTheme } from ".";

it("Works", () => {
  expect(useTheme()).toContain("min-width");
});
