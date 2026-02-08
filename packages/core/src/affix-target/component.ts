import { provideAffixTarget } from "@hoci/core";
import { asProps, elementRef } from "@hoci/shared";
import { defineComponent, h, renderSlot } from "vue";

export const HiAffixTarget = defineComponent({
  name: "HiAffixTarget",
  props: {
    ...asProps
  },
  setup(props, context) {
    const targetRef = elementRef();
    provideAffixTarget(targetRef);
    return () => h(props.as, {
      ref: targetRef,
      ...context.attrs
    }, renderSlot(context.slots, "default"));
  }
});
