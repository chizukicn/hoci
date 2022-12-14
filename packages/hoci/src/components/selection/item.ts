import { resolveRef } from "@vueuse/core";
import type { PropType } from "vue";
import { capitalize, computed, defineComponent, h, inject, onDeactivated, renderSlot, watch } from "vue";
import { defineHookComponent, defineHookProps } from "../../shared";
import type { ElementLike } from "../../types";
import { valuePropType } from "../../constants";
import { ActivateEventSymbol, ActiveClassSymbol, ChangeActiveSymbol, InitSymbol, IsActiveSymbol, ItemClassSymbol, ItemLabelSymbol, UnactiveSymbol } from "./constants";

export const selectionItemProps = defineHookProps({
  value: {
    type: valuePropType,
    default() {
      return Math.random().toString(16).slice(2);
    }
  },
  label: {
    type: [Function, String] as PropType<string | ((val: any) => string) | ElementLike | null>
  },
  keepAlive: {
    type: Boolean,
    default: () => true
  },
  key: {
    type: [String, Number, Symbol] as PropType<string | number | symbol>
  },
  activateEvent: {
    type: String as PropType<"click" | "mouseenter" | "mousedown" | "mouseup" | "dblclick" | "contextmenu">
  }
});

export const useSelectionItem = defineHookComponent({
  props: selectionItemProps,
  setup(props, { slots }) {
    const parentLabel = resolveRef(inject(ItemLabelSymbol));

    function render() {
      return renderSlot(slots, "default", {}, () => {
        let label = props.label ?? parentLabel.value;
        if (label) {
          if (typeof label == "function") {
            label = label(props.value)!;
          }
        }
        return Array.isArray(label) ? label : [label];
      });
    }

    let remove = () => { };
    const init = inject(InitSymbol);
    if (init) {
      watch(
        () => props.value,
        value => {
          remove();
          remove = init({
            id: Math.random().toString(16).slice(2),
            label: typeof props.label == "string" ? props.label : undefined,
            value,
            render
          });
        },
        { immediate: true }
      );
      onDeactivated(() => remove());
    }

    const isActive = inject(IsActiveSymbol, () => false);

    const changeActive = inject(ChangeActiveSymbol, () => false);

    const activeClass = computed(() => inject(ActiveClassSymbol)?.value ?? "active");
    const unactiveClass = computed(() => inject(UnactiveSymbol)?.value ?? "unactive");

    const itemClass = computed(() => {
      return [inject(ItemClassSymbol)?.value ?? ""].concat(isActive(props.value) ? activeClass.value : unactiveClass.value);
    });

    const activateEvent = resolveRef(() => {
      const event = inject(ActivateEventSymbol);
      return props.activateEvent ?? event?.value ?? "click";
    });

    return {
      activate() {
        changeActive(props.value);
      },
      render,
      isActive,
      activeClass,
      unactiveClass,
      itemClass,
      activateEvent
    };
  }
});

export const HiItem = defineComponent({
  name: "HiItem",
  props: selectionItemProps,
  setup(props, context) {
    const { render, activate, itemClass, activateEvent } = useSelectionItem(props, context);

    return () =>
      h("div", {
        class: itemClass.value,
        [`on${capitalize(activateEvent.value)}`]: activate
      }, render());
  }
});
