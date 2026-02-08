import type { CSSProperties, PropType } from "vue";
import type { VirtualListSlotData } from "./index";
import { asProps, asPropType, classPropType } from "@hoci/shared";
import { each } from "tslx";
import { computed, defineComponent, h, renderSlot } from "vue";
import { useVirtualList, virtualListEmits, virtualListProps } from "./index";

export const HiVirtualList = defineComponent({
  name: "HiVirtualList",
  inheritAttrs: true,
  props: {
    ...virtualListProps,
    ...asProps,
    wrapperAs: {
      type: asPropType,
      default: () => "div"
    },
    wrapperStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    wrapperClass: {
      type: classPropType,
      default: () => ""
    }
  },
  emits: virtualListEmits,
  setup(props, context) {
    const { slots, expose } = context;

    const {
      totalSize,
      scrollElementRef,
      virtualItems,
      scrollToIndex,
      scrollToStart,
      scrollToEnd
    } = useVirtualList(props, context);

    expose({
      scrollToIndex,
      scrollToStart,
      scrollToEnd,
    });

    const wrapperStyle = computed(() => {
      return {
        position: "relative",
        [props.horizontal ? "width" : "height"]: `${totalSize.value}px`,
        ...props.wrapperStyle
      };
    });

    return () =>
      h(
        props.as,
        {
          ref: scrollElementRef,
          style: {
            [props.horizontal ? "overflowX" : "overflowY"]: "auto"
          }
        },
        [
          h(
            props.wrapperAs,
            {
              style: wrapperStyle.value,
              class: props.wrapperClass
            },
            each(virtualItems.value, (item) => {
              const slotData: VirtualListSlotData = {
                ...item,
                style: {
                  position: "absolute",
                  [props.horizontal ? "left" : "top"]: `${item.start}px`,
                  [props.horizontal ? "width" : "height"]: `${item.size}px`
                }
              };
              return renderSlot(slots, "item", slotData);
            })
          )
        ]
      );
  }
});
