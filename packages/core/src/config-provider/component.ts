import { configProviderProps, provideSharedConfig } from "@hoci/core";
import { asProps } from "@hoci/shared";
import { defineComponent, h, renderSlot } from "vue";

export const HiConfigProvider = defineComponent({
  props: {
    ...configProviderProps,
    ...asProps
  },
  setup(props, context) {
    provideSharedConfig(props);
    return () => {
      const content = renderSlot(context.slots, "default", undefined);
      return h(props.as, content);
    };
  }
});
