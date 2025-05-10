import type { VirtualizerOptions as _VirtualizerOptions, PartialKeys, ScrollToOptions, VirtualItem } from "@tanstack/virtual-core";
import type { CSSProperties, PropType } from "vue";
import { defineHookComponent, defineHookEmits, defineHookProps, elementRef } from "@hoci/shared";
import {
  elementScroll,
  observeElementOffset,
  observeElementRect,
  Virtualizer
} from "@tanstack/virtual-core";
import { tryOnScopeDispose } from "@vueuse/core";
import {
  computed,
  shallowRef,
  triggerRef,
  watch
} from "vue";

export type VirtualizerOptions<
  TScrollElement extends Element,
  TItemElement extends Element = Element
> = PartialKeys<
  _VirtualizerOptions<TScrollElement, TItemElement>,
  "observeElementRect" | "observeElementOffset" | "scrollToFn" | "getScrollElement" | "initialOffset"
>;

export const virtualListProps = defineHookProps({
  options: {
    type: Object as PropType<PartialKeys<VirtualizerOptions<HTMLElement, HTMLElement>, "observeElementRect" | "observeElementOffset" | "scrollToFn" | "getScrollElement">>,
    default: () => ({})
  },
  count: {
    type: Number,
    default: () => 0
  },
  estimateSize: {
    type: [Function, Number] as PropType<((index: number) => number) | number>,
    default: () => 50
  },
  horizontal: {
    type: Boolean,
    default: () => false
  },
});

export const virtualListEmits = defineHookEmits({
  scrollEnd: () => true,
  scrollStart: () => true,
  scroll: (_: number[]) => true
});

export interface VirtualListSlotData extends VirtualItem, Record<string, unknown> {
  style: CSSProperties;
}

export { ScrollToOptions, VirtualItem };

export const useVirtualList = defineHookComponent({
  props: virtualListProps,
  emits: virtualListEmits,
  setup(props, context) {
    const { emit } = context;
    const scrollElementRef = elementRef();
    const propsEstimateSize = props.estimateSize;
    const estimateSize = typeof propsEstimateSize === "function" ? propsEstimateSize : () => propsEstimateSize;

    const options = computed(() => {
      const opts = { ...(props.options || {}) };
      return {
        ...opts,
        count: props.count,
        estimateSize,
        horizontal: props.horizontal,
        getScrollElement: () => scrollElementRef.value,
        observeElementRect,
        observeElementOffset,
        scrollToFn: elementScroll
      };
    });

    const virtualizer = new Virtualizer(options.value);

    const state = shallowRef(virtualizer);

    const virtualItems = computed(() => state.value.getVirtualItems());

    const virtualIndexes = computed(() => state.value.getVirtualIndexes());

    const totalSize = computed(() => state.value.getTotalSize());

    watch(
      virtualIndexes,
      (indexes) => {
        if (indexes.length === 0) {
          return;
        }
        if (indexes[indexes.length - 1] === props.count - 1) {
          emit("scrollEnd");
        } else if (indexes[0] === 0) {
          emit("scrollStart");
        }
        emit("scroll", indexes);
      },
      { immediate: true }
    );

    watch(
      options,
      (opts) => {
        virtualizer.setOptions({
          ...opts,
          onChange: (instance, sync) => {
            opts.onChange?.(instance, sync);
            triggerRef(state);
          }
        });
        virtualizer._willUpdate();
        triggerRef(state);
      },
      { immediate: true },
    );

    watch(
      scrollElementRef,
      (el) => {
        if (el) {
          virtualizer._willUpdate();
          triggerRef(state);
        }
      },
      { immediate: true },
    );

    tryOnScopeDispose(virtualizer._didMount());

    const measureElement = (el: HTMLElement | null) => {
      virtualizer.measureElement(el);
    };

    const scrollToIndex = (index: number, options: ScrollToOptions = {
      behavior: "smooth"
    }) => {
      virtualizer.scrollToIndex(index, options);
    };

    const scrollToStart = (options: ScrollToOptions = {
      behavior: "smooth"
    }) => {
      scrollToIndex(0, options);
    };

    const scrollToEnd = (options: ScrollToOptions = {
      behavior: "smooth"
    }) => {
      scrollToIndex(props.count - 1, options);
    };

    return {
      virtualizer,
      virtualItems,
      virtualIndexes,
      totalSize,
      scrollElementRef,
      measureElement,
      scrollToIndex,
      scrollToStart,
      scrollToEnd
    };
  }
});
