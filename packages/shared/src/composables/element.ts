import type { MaybeRefOrGetter, Ref } from "vue";
import { useMounted } from "@vueuse/core";
import { computed, shallowRef, toValue } from "vue";

export function useElement<E extends Element = HTMLElement>(elementSelector: MaybeRefOrGetter<string | Element | undefined | null>, defaultValue?: Ref<E | null | undefined> | MaybeRefOrGetter<E | null | undefined>): Ref<E | null | undefined> {
  const isMounted = useMounted();

  const el = computed(() => {
    const selector = toValue(elementSelector);
    if (typeof selector === "string") {
      if (isMounted.value) {
        return document.querySelector<E>(selector) ?? null;
      }
      return null;
    }
    return selector as E;
  });

  return computed(() => el.value ?? toValue(defaultValue));
}

export type ElementRef<T extends HTMLElement = HTMLElement> = Ref<T | null>;

export function elementRef<T extends HTMLElement = HTMLElement>(): ElementRef<T> {
  return shallowRef<T | null>(null);
}
