import { useBreakpoint } from ".";

it("Works for a multiple elements array ", () => {
  expect(useBreakpoint(["mobile", "tablet"]).length).toBe(2);
});

it("Works for a single element array ", () => {
  expect(useBreakpoint(["mobile"]).length).toBe(1);
});

it("Works for a single name", () => {
  expect(useBreakpoint("mobile")).toContain("@media(min-width");
});

it("Returns an Emotion friendly query", () => {
  expect(useBreakpoint("mobile")).toContain("@media(min-width");
});

it("Returns a `min-width` query", () => {
  expect(useBreakpoint("mobile")).toContain("min-width");
});
