import type { Component, PropType } from "vue";

export const valuePropType = [
  String,
  Number,
  Object,
  Boolean,
  null
] as PropType<any>;

export const classPropType = [String, Array, Object] as PropType<
string | string[] | Record<string, boolean>
>;

export const asPropType = [String, Object, Function] as PropType<string | Component | ((props: any) => any)>;

export const labelPropType = [String, Function] as PropType<
string | ((val?: any) => string) | null
>;

export const asProps = {
  as: {
    type: asPropType,
    default: "div"
  }
};
