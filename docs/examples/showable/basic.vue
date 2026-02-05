<script lang="ts" setup>
import {
  useShowableContextProvider,
  useShowableInstance
} from "hoci";
import { h } from "vue";

const Content = {
  setup() {
    const { show, status, close, confirm, reject, cancel, visible } = useShowableInstance();
    return () =>
      h("div", { class: "flex flex-col gap-2" }, [
        h("div", { class: "flex gap-2 flex-wrap" }, [
          h("button", {
            class: "b-1 b-gray-200 b-solid rounded px-2 py-1",
            onClick: () => show()
          }, "打开"),
          h("button", {
            class: "b-1 b-gray-200 b-solid rounded px-2 py-1",
            onClick: () => close()
          }, "关闭"),
          h("button", {
            class: "b-1 b-gray-200 b-solid rounded px-2 py-1",
            onClick: confirm
          }, "确认"),
          h("button", {
            class: "b-1 b-gray-200 b-solid rounded px-2 py-1",
            onClick: reject
          }, "拒绝"),
          h("button", {
            class: "b-1 b-gray-200 b-solid rounded px-2 py-1",
            onClick: cancel
          }, "取消")
        ]),
        h("div", { class: "text-sm c-gray-6" }, [
          "visible: ",
          String(visible.value),
          " · status: ",
          String(status.value)
        ])
      ]);
  }
};

const Provider = {
  setup() {
    useShowableContextProvider();
    return () => h(Content);
  }
};
</script>

<template>
  <Provider />
</template>
