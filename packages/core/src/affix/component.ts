import { affixProps, useAffix } from "@hoci/core";
import { defineComponent, h, renderSlot } from "vue";

export const HiAffix = defineComponent({
  name: "HiAffix",
  props: {
    ...affixProps,
    as: {
      type: String,
      default: "div"
    }
  },
  setup(props, context) {
    const { className, wrapperRef, isFixed, placeholderStyle, fixedStyle } = useAffix(props, context);

    return () => h(props.as, { ref: wrapperRef }, [
      isFixed.value && h("div", { style: placeholderStyle.value }),
      h("div", { class: className.value, style: fixedStyle.value }, renderSlot(context.slots, "default"))
    ]);
  }
});
