import type { PropType } from "vue";
import type { Placement, TriggerEvent } from "../popover";
import { asProps, asPropType, classPropType, useSharedConfig } from "@hoci/shared";
import { cls } from "tslx";
import { defineComponent, h, renderSlot } from "vue";
import { HiPopover } from "../popover/component";

export const HiTooltip = defineComponent({
  name: "HiTooltip",
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: "top"
    },
    triggerEvent: {
      type: String as PropType<TriggerEvent>,
      default: "hover"
    },
    content: {
      type: String
    },
    class: {
      type: classPropType
    },
    offset: {
      type: Number,
      default: 8
    },
    disabled: {
      type: Boolean,
      default: false
    },
    popupAs: {
      type: asPropType,
      default: "div"
    },
    ...asProps
  },
  setup(props, context) {
    const sharedTooltip = useSharedConfig("tooltip");
    const popupClass = cls([sharedTooltip.class, props.class]);

    return () => {
      const { content: _content, class: _class, ...popoverProps } = props;
      return h(
        HiPopover,
        {
          ...popoverProps,
          popupClass
        },
        {
          default: () => renderSlot(context.slots, "default"),
          popup: () =>
            context.slots.popup?.() ?? (props.content ? [props.content] : [])
        }
      );
    };
  }
});
