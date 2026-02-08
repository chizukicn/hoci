import type { KeepAliveProps, PropType } from "vue";
import { asProps, asPropType, classPropType } from "@hoci/shared";
import { defineComponent, h, KeepAlive, renderSlot } from "vue";
import { selectionProps, useSelectionList } from "../selection";

export const HiTabs = defineComponent({
  name: "HiTabs",
  props: {
    ...selectionProps,
    headerClass: {
      type: classPropType
    },
    ...asProps,
    headerAs: {
      type: asPropType,
      default: "div"
    },
    contentAs: {
      type: asPropType,
      default: "div"
    },
    contentClass: {
      type: classPropType
    },
    keepAlive: {
      type: [Boolean, Object] as PropType<boolean | KeepAliveProps>,
      default: false
    }
  },
  inheritAttrs: true,
  setup(props, context) {
    const selection = useSelectionList(props, context);

    return () => {
      let component = selection.renderItem();
      if (props.keepAlive) {
        component = h(KeepAlive, {
          ...(typeof props.keepAlive === "object" ? props.keepAlive : {})
        }, component);
      }

      if (context.slots.content) {
        component = context.slots.content({
          component
        });
      } else {
        component = h(props.contentAs, {
          class: props.contentClass
        }, component);
      }

      return h(props.as, [
        h(props.headerAs, {
          class: props.headerClass
        }, renderSlot(context.slots, "default")),
        component
      ]);
    };
  }
});
