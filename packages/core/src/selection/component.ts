import { selectionEmits, selectionProps, useSelectionList } from "@hoci/core";
import { asProps } from "@hoci/shared";
import { defineComponent, h } from "vue";

export const HiSelection = defineComponent({
  name: "HiSelection",
  props: {
    ...selectionProps,
    ...asProps
  },
  emits: selectionEmits,
  setup(props, context) {
    const { render } = useSelectionList(props, context);

    return () => h(props.as, {}, render());
  }
});
