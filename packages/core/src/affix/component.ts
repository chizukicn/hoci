import { affixProps, useAffix } from "@hoci/core";
import { asProps } from "@hoci/shared";
import { defineComponent, h, renderSlot } from "vue";

export const HiAffix = defineComponent({
  name: "HiAffix",
  props: {
    ...affixProps,
    ...asProps
  },
  setup(props, context) {
    const { className, wrapperRef, isFixed, placeholderStyle, fixedStyle } = useAffix(props, context);

    return () => h(props.as, { ref: wrapperRef }, [
      isFixed.value && h("div", { style: placeholderStyle.value }),
      h("div", { class: className.value, style: fixedStyle.value }, renderSlot(context.slots, "default"))
    ]);
  }
});
