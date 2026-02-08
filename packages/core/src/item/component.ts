import { itemEmits, itemProps, useSelectionItem } from "@hoci/core";
import { asProps } from "@hoci/shared";
import { capitalize } from "tslx";
import { defineComponent, h } from "vue";

export const HiItem = defineComponent({
  name: "HiItem",
  props: {
    ...itemProps,
    ...asProps
  },
  emits: itemEmits,
  setup(props, context) {
    const { render, activate, className, isDisabled, activateEvent } = useSelectionItem(
      props,
      context
    );
    return () =>
      h(
        props.as,
        {
          class: className.value,
          [`on${capitalize(activateEvent.value)}`]: activate,
          disabled: isDisabled.value
        },
        render()
      );
  }
});
