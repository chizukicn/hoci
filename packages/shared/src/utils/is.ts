import type { Fn } from "maybe-types";
import type { Constructor } from "../types";

export const isWindow = (val: any): val is Window => typeof window !== "undefined" && ["[object Window]", "[object global]"].includes(toString.call(val));

export function isFunction<F extends Fn>(value: unknown): value is F {
  return typeof value === "function";
}

export function isConstructor<T>(value: unknown): value is Constructor<T> {
  return isFunction(value) && value.prototype !== undefined;
}
