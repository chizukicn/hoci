import { popoverEmits, popoverProps, usePopover } from "@hoci/core";
import { defineComponent, h, renderSlot, Teleport } from "vue";

export const HiPopover = defineComponent({
  name: "HiPopover",
  props: {
    ...popoverProps,
    as: {
      type: String,
      default: "div"
    }
  },
  emits: popoverEmits,
  setup(props, context) {
    const { show, close, triggerRef, popupClass, events, popupRef, popupStyle } = usePopover(props, context);
    context.expose({
      show,
      close
    });
    return () => {
      let content = h(
        "div",
        {
          class: popupClass.value,
          style: popupStyle.value,
          ref: popupRef
        },
        renderSlot(context.slots, "popup")
      );

      if (props.teleport) {
        content = h(
          Teleport,
          {
            to: props.teleport === true ? "body" : props.teleport
          },
          content
        );
      }

      return h(props.as, {
        ref: triggerRef,
        ...events
      }, [
        renderSlot(context.slots, "default"),
        content
      ]);
    };
  }
});
