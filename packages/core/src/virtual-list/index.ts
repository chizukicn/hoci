import type { PartialKeys, VirtualizerOptions } from "@tanstack/virtual-core";
import type { PropType, Ref } from "vue";
import { defineHookComponent, defineHookProps, elementRef, toRef } from "@hoci/shared";
import {
  elementScroll,
  observeElementOffset,
  observeElementRect,
  observeWindowOffset,
  observeWindowRect,
  Virtualizer,
  windowScroll,
} from "@tanstack/virtual-core";
import { tryOnScopeDispose } from "@vueuse/core";
import {
  computed,
  shallowRef,
  triggerRef,
  watch
} from "vue";

export * from "@tanstack/virtual-core";

type MaybeRef<T> = T | Ref<T>;

function useVirtualizerBase<
  TScrollElement extends Element | Window,
  TItemElement extends Element,
>(
  options: MaybeRef<VirtualizerOptions<TScrollElement, TItemElement>>,
): Ref<Virtualizer<TScrollElement, TItemElement>> {
  const optionsRef = toRef(options);
  const virtualizer = new Virtualizer(optionsRef.value);
  const state = shallowRef(virtualizer);

  const cleanup = virtualizer._didMount();

  watch(
    () => optionsRef.value?.getScrollElement(),
    (el) => {
      if (el) {
        virtualizer._willUpdate();
      }
    },
    {
      immediate: true,
    },
  );

  watch(
    optionsRef,
    (options) => {
      virtualizer.setOptions({
        ...options,
        onChange: (instance, sync) => {
          triggerRef(state);
          options.onChange?.(instance, sync);
        },
      });

      virtualizer._willUpdate();
      triggerRef(state);
    },
    {
      immediate: true,
    },
  );

  tryOnScopeDispose(cleanup);
  return state;
}

export function useVirtualizer<
  TScrollElement extends Element,
  TItemElement extends Element,
>(
  options: MaybeRef<
    PartialKeys<
      VirtualizerOptions<TScrollElement, TItemElement>,
      "observeElementRect" | "observeElementOffset" | "scrollToFn"
    >
  >,
): Ref<Virtualizer<TScrollElement, TItemElement>> {
  const optionsRef = toRef(options);
  const virtualizer = useVirtualizerBase<TScrollElement, TItemElement>(
    computed(() => ({
      observeElementRect,
      observeElementOffset,
      scrollToFn: elementScroll,
      ...optionsRef.value,
    })),
  );
  return virtualizer;
}

export function useWindowVirtualizer<TItemElement extends Element>(
  options: MaybeRef<
    PartialKeys<
      VirtualizerOptions<Window, TItemElement>,
      | "observeElementRect"
      | "observeElementOffset"
      | "scrollToFn"
      | "getScrollElement"
    >
  >,
): Ref<Virtualizer<Window, TItemElement>> {
  const optionsRef = toRef(options);
  return useVirtualizerBase<Window, TItemElement>(
    computed(() => ({
      getScrollElement: () => (typeof document !== "undefined" ? window : null),
      observeElementRect: observeWindowRect,
      observeElementOffset: observeWindowOffset,
      scrollToFn: windowScroll,
      initialOffset: () =>
        typeof document !== "undefined" ? window.scrollY : 0,
      ...optionsRef.value,
    })),
  );
}

const virtualListProps = defineHookProps({
  options: {
    type: Object as PropType<PartialKeys<VirtualizerOptions<any, any>, "observeElementRect" | "observeElementOffset" | "scrollToFn" | "getScrollElement">>,
    default: () => ({})
  },
  estimateSize: {
    type: [Function, Number] as PropType<VirtualizerOptions<any, any>["estimateSize"] | number>,
    default: () => 50
  },
  totalCount: {
    type: Number,
    default: () => 0
  },
  window: {
    type: Boolean,
    default: () => false
  },
  isRtl: {
    type: Boolean,
    default: () => false
  }
});

export const useVirtualList = defineHookComponent({
  props: virtualListProps,
  setup(props) {
    const scrollElementRef = elementRef();
    const propsEstimateSize = props.estimateSize;
    const estimateSize = typeof propsEstimateSize === "function" ? propsEstimateSize : () => propsEstimateSize;

    const virtualizer = props.window
      ? useWindowVirtualizer({
          ...props.options,
          count: props.totalCount,
          estimateSize,
          isRtl: props.isRtl
        })
      : useVirtualizer({
          ...props.options,
          count: props.totalCount,
          getScrollElement: () => scrollElementRef.value as Element | null,
          estimateSize
        });
    const virtualItems = computed(() => virtualizer.value.getVirtualItems());
    const totalSize = computed(() => virtualizer.value.getTotalSize());
    const measureElement = (el: Element) => {
      virtualizer.value.measureElement(el);
    };
    const scrollToIndex = (index: number) => {
      virtualizer.value.scrollToIndex(index);
    };
    const scrollToOffset = (offset: number) => {
      virtualizer.value.scrollToOffset(offset);
    };
    const scrollTo = (index: number, offset: number) => {
      virtualizer.value.scrollToIndex(index);
      virtualizer.value.scrollToOffset(offset);
    };
    const scrollBy = (delta: number) => {
      virtualizer.value.scrollBy(delta);
    };
    const scrollToStart = () => {
      virtualizer.value.scrollToIndex(0);
    };
    const scrollToEnd = () => {
      virtualizer.value.scrollToIndex(virtualizer.value.getVirtualItems().length - 1);
    };
    return {
      virtualizer,
      virtualItems,
      totalSize,
      measureElement,
      scrollElementRef,
      scrollToIndex,
      scrollToOffset,
      scrollTo,
      scrollBy,
      scrollToStart,
      scrollToEnd
    };
  }
});
