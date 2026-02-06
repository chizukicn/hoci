<script lang="ts" setup>
import { useDemoI18n } from "@demo-i18n";
import {
  onShowableShow,
  useShowableContextProvider,
  useShowableInstance
} from "hoci";

import { h, ref } from "vue";

const received = ref<string>("");

const Trigger = {
  setup() {
    const { show } = useShowableInstance();
    return () =>
      h("div", { class: "flex gap-2 flex-wrap" }, [
        h("button", {
          class: "b-1 b-gray-200 b-solid rounded px-2 py-1",
          onClick: () => {
            show({
              id: 1,
              name: "Item A"
            });
          }
        }, "Open (id: 1, name: Item A)"),
        h("button", {
          class: "b-1 b-gray-200 b-solid rounded px-2 py-1",
          onClick: () => {
            show({
              id: 2,
              name: "Item B"
            });
          }
        }, "Open (id: 2, name: Item B)")
      ]);
  }
};

const Content = {
  setup() {
    const { t: tContent } = useDemoI18n();
    onShowableShow((params?: { id: number; name: string }) => {
      received.value = params
        ? `id: ${params.id}, name: ${params.name}`
        : "";
    });
    return () => h("div", { class: "text-sm c-gray-6" }, [
      tContent("Params received: ", "内部收到的参数: "),
      received.value || "—"
    ]);
  }
};

const Provider = {
  setup() {
    useShowableContextProvider();
    return () =>
      h("div", { class: "flex flex-col gap-3" }, [
        h(Trigger),
        h(Content)
      ]);
  }
};
</script>

<template>
  <Provider />
</template>
