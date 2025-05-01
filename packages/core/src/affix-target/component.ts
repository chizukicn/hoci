import { elementRef } from "@hoci/shared";
import { defineComponent, h, renderSlot } from "vue";
import { provideAffixTarget } from "../affix";

export const HiAffixTarget = defineComponent({
  name: "HiAffixTarget",
  setup(_, context) {
    const targetRef = elementRef();
    provideAffixTarget(targetRef);
    return () => h("div", {
      ref: targetRef,
      ...context.attrs
    }, renderSlot(context.slots, "default"));
  }
});
