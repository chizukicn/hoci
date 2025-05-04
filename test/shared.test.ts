import type { ElementLike } from "@hoci/shared";
import { defineHookEmits, defineHookProps, getFirstChilld, isConstructor, isExtends, isFunction, isWindow, throttleByRaf, toArray } from "@hoci/shared";
import { describe, expect, it, vi } from "vitest";

describe("shared utils", () => {
  describe("isFunction", () => {
    it("should return true for functions", () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(class {})).toBe(true);
    });
    it("should return false for non-functions", () => {
      expect(isFunction(123)).toBe(false);
      expect(isFunction("string")).toBe(false);
      expect(isFunction({})).toBe(false);
      expect(isFunction(null)).toBe(false);
      expect(isFunction(undefined)).toBe(false);
    });
  });

  describe("isWindow", () => {
    it("should return true for window object", () => {
      expect(isWindow(window)).toBe(true);
    });
    it("should return false for non-window values", () => {
      expect(isWindow({})).toBe(false);
      expect(isWindow(null)).toBe(false);
      expect(isWindow(undefined)).toBe(false);
    });
  });

  describe("isConstructor", () => {
    it("should return true for constructors", () => {
      class TestClass {}
      function TestFunction() {}
      expect(isConstructor(TestClass)).toBe(true);
      expect(isConstructor(TestFunction)).toBe(true);
    });
    it("should return false for non-constructors", () => {
      const arrowFunction = () => {};
      expect(isConstructor(arrowFunction)).toBe(false);
      expect(isConstructor({})).toBe(false);
      expect(isConstructor(null)).toBe(false);
      expect(isConstructor(undefined)).toBe(false);
    });
  });

  describe("toArray", () => {
    it("should convert non-array to array", () => {
      expect(toArray("test")).toEqual(["test"]);
      expect(toArray(null)).toEqual([null]);
      expect(toArray(undefined)).toEqual([undefined]);
      expect(toArray({})).toEqual([{}]);
    });
    it("should return array as is", () => {
      expect(toArray([1, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe("throttleByRaf", () => {
    it("should only call with the first argument in a frame", () => {
      vi.useFakeTimers();
      const mockFn = vi.fn();
      const throttled = throttleByRaf(mockFn);
      throttled(1);
      throttled(2);
      throttled(3);
      expect(mockFn).not.toBeCalled();
      vi.runAllTimers();
      expect(mockFn).toBeCalledTimes(1);
      expect(mockFn).toBeCalledWith(1);
      throttled(4);
      throttled.cancel();
      vi.runAllTimers();
      expect(mockFn).toBeCalledTimes(1);
      vi.useRealTimers();
    });
  });

  describe("getFirstChilld", () => {
    it("should get the first child correctly", () => {
      const elements: ElementLike[] = ["first"];
      const nestedElements: ElementLike[] = [["nested"]];
      const deeplyNested: ElementLike[] = [["deeply", "nested"]];
      const stringElements: ElementLike[] = ["1", "2", "3"];
      expect(getFirstChilld(elements)).toBe("first");
      expect(getFirstChilld(nestedElements)).toBe("nested");
      expect(getFirstChilld(deeplyNested)).toEqual(["deeply", "nested"]);
      expect(getFirstChilld(stringElements)).toBe("1");
    });
  });
});

describe("hook utils", () => {
  describe("defineHookProps", () => {
    it("should define props correctly", () => {
      const props = defineHookProps({
        foo: String,
        bar: {
          type: Number,
          default: 42
        },
        baz: {
          type: Boolean,
          default: false
        }
      });
      expect(props.foo).toBe(String);
      expect(props.bar.type).toBe(Number);
      expect(props.bar.default).toBe(42);
      expect(props.baz.type).toBe(Boolean);
      expect(props.baz.default).toBe(false);
    });
  });
  describe("defineHookEmits", () => {
    it("should define emits correctly", () => {
      const emits = defineHookEmits(["change", "update"]);
      expect(emits).toEqual(["change", "update"]);
      const emitsObj = defineHookEmits({
        change: (_: any) => true,
        update: (_: any) => true
      });
      // Check if emitsObj is an object type
      if (!Array.isArray(emitsObj)) {
        expect(emitsObj.change).toBeTypeOf("function");
        expect(emitsObj.update).toBeTypeOf("function");
      }
    });
  });
});

describe("type utils", () => {
  describe("isExtends", () => {
    it("should check type extends correctly", () => {
      class Parent {}
      class Child extends Parent {}
      expect(isExtends(Boolean, Boolean)).toBe(true);
      expect(isExtends([String, Number], Number)).toBe(true);
      expect(isExtends([String, Boolean], Number)).toBe(false);
      expect(isExtends(Child, Parent)).toBe(false); // Note: This actually returns false because isExtends is mainly for checking Vue prop types
    });
  });
});
