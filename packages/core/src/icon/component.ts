import { iconProps, useIcon } from "@hoci/core";
import { asProps } from "@hoci/shared";
import { defineComponent, h } from "vue";

export const HiIcon = defineComponent({
  props: {
    ...iconProps,
    ...asProps
  },
  setup(props, context) {
    const { style } = useIcon(props, context);
    return () => {
      return h(props.as, {
        style: style.value
      });
    };
  }
});
