import { asProps } from "@hoci/shared";
import { capitalize } from "tslx";
import { defineComponent, h } from "vue";
import { itemEmits, itemProps, useSelectionItem } from "../item";

export const HiTabPane = defineComponent({
  name: "HiTabPane",
  props: {
    ...itemProps,
    ...asProps
  },
  emits: itemEmits,
  inheritAttrs: true,
  setup(props, context) {
    const { className, activateEvent, activate, isDisabled, label } = useSelectionItem(props, context);
    return () => {
      return h(props.as, {
        class: className.value,
        [`on${capitalize(activateEvent.value)}`]: activate,
        disabled: isDisabled.value
      }, label.value);
    };
  }
});
