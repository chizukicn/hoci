import { switchEmits, switchProps, useSwitch } from "@hoci/core";
import { capitalize } from "tslx";
import { defineComponent, h, renderSlot } from "vue";

export const HiSwitch = defineComponent({
  name: "HiSwitch",
  props: {
    ...switchProps,
    as: {
      type: String,
      default: "div"
    }
  },
  emits: switchEmits,

  setup(props, context) {
    const { slots } = context;
    const { className, toggle, modelValue, isDisabled, activateEvent } = useSwitch(props, context);

    return () => {
      return h(
        props.as,
        {
          class: className.value,
          [`on${capitalize(activateEvent.value)}`]: toggle
        },
        renderSlot(slots, "default", {
          active: modelValue.value,
          isDisabled: isDisabled.value
        })
      );
    };
  }
});
