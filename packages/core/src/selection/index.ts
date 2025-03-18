import type { ActivateEvent, ElementLike } from "@hoci/shared";
import type { InjectionKey, PropType } from "vue";
import {
  classPropType,
  defineHookComponent,
  defineHookEmits,
  defineHookProps,
  getFirstChilld,
  labelPropType,
  toReactive,
  useSharedConfig,
  valuePropType
} from "@hoci/shared";
import { isDefined, syncRef } from "@vueuse/core";
import { cls } from "tslx";
import {
  computed,
  inject,
  provide,
  reactive,
  renderSlot
} from "vue";

export type InitFunction = (option: Option) => () => void;

export interface Option {
  id?: string;
  label?: string;
  value: any | null;
  render: () => ElementLike;
}

export interface HiSelectionContext {
  activate: (_: any) => void;
  reject: (_: any) => void;
  /**
   * @deprecated
   * use activate instead
   */
  changeActive: (_: any) => void;
  isActive: (_: any) => boolean;
  init?: InitFunction;
  activateEvent: ActivateEvent;
  activeClass: string;
  itemClass: string;
  unactiveClass: string;
  disabledClass: string;
  label: string | ((_: any) => ElementLike | null | undefined) | null | undefined;
  multiple: boolean;
  limit: [number, number];
}

export const selectionProps = defineHookProps({

  modelValue: {
    type: valuePropType,
    default: () => null
  },
  /**
   * 选中时的 class
   */
  activeClass: {
    type: classPropType,
    default: "active"
  },
  /**
   *  每个选项的 class
   */
  itemClass: {
    type: classPropType,
    default: ""
  },
  disabledClass: {
    type: classPropType,
    default: "disabled"
  },
  unactiveClass: {
    type: classPropType,
    default: ""
  },
  label: {
    type: labelPropType
  },

  /**
   *  多选模式
   */
  multiple: {
    type: [Boolean, Number, Array] as PropType<boolean | number | [number, number?]>,
    default: () => false
  },
  /**
   * 可清除
   */
  clearable: {
    type: Boolean
  },
  defaultValue: {
    type: valuePropType,
    default: () => null
  },
  activateEvent: {
    type: String as PropType<ActivateEvent>
  }
});

export type SelectionProps = typeof selectionProps;

export const selectionEmits = defineHookEmits([
  "update:modelValue",
  "change",
  "load",
  "unload",
  "reject"
]);

const HiSelectionContextSymbol: InjectionKey<HiSelectionContext> = Symbol("[hi-selection]context");

export function useSelectionContext() {
  const sharedConfig = useSharedConfig();
  return inject(HiSelectionContextSymbol, {
    isActive: () => false,
    activate: () => {},
    changeActive: () => {},
    reject: () => {},
    activeClass: "active",
    unactiveClass: "unactive",
    disabledClass: "disabled",
    itemClass: "",
    activateEvent: sharedConfig.activateEvent,
    label: null,
    multiple: false,
    limit: [0, Number.POSITIVE_INFINITY]
  });
}

export const useSelectionList = defineHookComponent({
  props: selectionProps,
  emits: selectionEmits,
  setup(props, { emit, slots }) {
    const options = reactive<Option[]>([]);

    function toArray(value?: any | any[]): any[] {
      if (!isDefined(value)) {
        return [];
      }
      if (props.multiple && Array.isArray(value)) {
        return value.filter((v) => v != null || v !== undefined);
      }
      return [value];
    }

    const actives: any[] = reactive<any[]>([
      ...toArray(props.modelValue ?? props.defaultValue)
    ]);

    const currentValue = computed({
      get() {
        return props.multiple ? actives : actives[0];
      },
      set(val) {
        actives.splice(0, actives.length, ...toArray(val));
      }
    });

    const modelValue = computed({
      get() {
        return props.modelValue ?? props.defaultValue;
      },
      set(val) {
        emit("update:modelValue", val);
      }
    });

    syncRef(currentValue, modelValue, { immediate: true, deep: true });

    const emitChange = () => emit("change", currentValue.value);

    function isActive(value: any) {
      return actives.includes(value);
    }

    const multipleActive = computed(() => !!props.multiple);

    /**
     * [min,max]
     */
    const multipleLimit = computed<[number, number]>(() => {
      if (Array.isArray(props.multiple)) {
        if (props.multiple[1] === undefined) {
          return [props.multiple[0], Number.POSITIVE_INFINITY];
        }
        return props.multiple as [number, number];
      }
      return [0, Number.POSITIVE_INFINITY];
    });

    function activate(value: any) {
      const [min, max] = multipleLimit.value;
      if (isActive(value)) {
        if ((multipleActive.value && actives.length > min) || props.clearable) {
          actives.splice(actives.indexOf(value), 1);
          emitChange();
        }
      } else {
        if (props.multiple) {
          if (actives.length < max) {
            actives.push(value);
            emitChange();
          }
        } else {
          actives.splice(0, actives.length, value);
          emitChange();
        }
      }
    }

    function reject(value: any) {
      emit("reject", value);
    }

    const init = (option: Option) => {
      function remove() {
        const index = options.findIndex((e) => e.id === option.id);
        if (index > -1) {
          options.splice(index, 1);
          emit("unload", option);
        }
      }
      for (let i = 0; i < options.length; i++) {
        if (options[i].value === option.value) {
          options.splice(i, 1);
          i--;
        }
      }
      options.push(option);
      emit("load", option);
      return remove;
    };

    const sharedConfig = useSharedConfig();

    provide(HiSelectionContextSymbol, toReactive({
      activeClass: computed(() => cls(props.activeClass)),
      unactiveClass: computed(() => cls(props.unactiveClass)),
      disabledClass: computed(() => cls(props.disabledClass)),
      itemClass: computed(() => cls(props.itemClass)),
      label: computed(() => props.label),
      multiple: multipleActive,
      limit: multipleLimit,
      clearable: computed(() => props.clearable),
      defaultValue: computed(() => props.defaultValue),
      activateEvent: computed(() => props.activateEvent ?? sharedConfig.activateEvent),
      active: currentValue,
      activate,
      changeActive: activate,
      isActive,
      reject,
      init
    }));

    const renderItem = () => {
      const children = options
        .filter((e) => actives.includes(e.value))
        .map((e) => e.render());
      return props.multiple ? children : getFirstChilld(children);
    };

    const slotData: HiSelectionSlotData = {
      isActive,
      changeActive: activate,
      renderItem
    };

    const render = () => {
      return renderSlot(slots, "default", slotData);
    };

    return {
      options,
      actives,
      isActive,
      changeActive: activate,
      renderItem,
      render
    };
  }
});

export interface HiSelectionSlotData extends Record<string, unknown> {
  isActive: (value: any) => boolean;
  changeActive: (value: any) => void;
  renderItem: () => ElementLike;
}
