import { isFunction } from "@hoci/shared";
import { expect, it } from "vitest";

it("is-function", () => {
  expect(isFunction(() => {})).toBe(true);
});
