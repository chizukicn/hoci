<script setup lang="ts">
import type { VirtualListSlotData } from "@hoci/core";
import { useDemoI18n } from "@demo-i18n";
import { ref } from "vue";

const MAX_COUNT = 3000;
const { t } = useDemoI18n();

const list = ref(Array.from({ length: 1000 }, (_, i) => ({
  name: `Item ${i + 1}`,
  value: i + 1
})));

function handleDelete(index: number) {
  list.value.splice(index, 1);
}

function appendBatch(num: number) {
  const oldLength = list.value.length;
  num = Math.min(num, MAX_COUNT - oldLength);
  list.value.push(...Array.from({ length: num }, (_, i) => ({
    name: `Item ${i + 1 + oldLength}`,
    value: i + 1 + oldLength
  })));
}

function handleScrollEnd() {
  appendBatch(100);
}
</script>

<template>
  <div class="w-120">
    <div class="flex gap-2">
      <div>{{ t("List length", "列表长度") }}: {{ list.length }}</div>
      <div>{{ t("Max count", "最大数量") }}: {{ MAX_COUNT }}</div>
    </div>
    <div class="flex gap-2 w-120">
      <button class="bg-blue-500 flex-1 text-white p-2 rounded-md hover:bg-blue-600 mb-4" @click="appendBatch(1)">
        {{ t("append 1 item", "添加 1 项") }}
      </button>
      <button class="bg-blue-500 flex-1 text-white p-2 rounded-md hover:bg-blue-600 mb-4" @click="appendBatch(10)">
        {{ t("append 10 items", "添加 10 项") }}
      </button>
      <button class="bg-blue-500 flex-1 text-white p-2 rounded-md hover:bg-blue-600 mb-4" @click="appendBatch(100)">
        {{ t("append 100 items", "添加 100 项") }}
      </button>
    </div>
    <hi-virtual-list
      :count="list.length"
      :estimate-size="40"
      class="overflow-y-auto w-120 h-100 border-1 border-solid border-#eee rounded-md"
      @scroll-end="handleScrollEnd"
    >
      <template #item="{ index, style }: VirtualListSlotData">
        <div
          :style="style"
          class="flex w-full space-x-4 justify-between items-center h-full p-4" :class="{
            'bg-white': index % 2 === 0,
            'bg-gray-50': index % 2 === 1,
          }"
        >
          <span class="text-center font-bold w-20 inline-block">{{ list[index].value }}</span>
          <span>{{ list[index].name }}</span>
          <span class="text-red-500 cursor-pointer" @click="handleDelete(index)">{{ t("delete", "删除") }}</span>
        </div>
      </template>
      <div class="absolute bottom-0 left-0 w-full">
        <div>{{ t("add", "添加") }}</div>
      </div>
    </hi-virtual-list>

    <hi-virtual-list
      :count="list.length"
      :estimate-size="200"
      horizontal
      class="overflow-x-auto w-full h-20 border-1 border-solid border-#eee rounded-md"
    >
      <template #item="{ index, style }: VirtualListSlotData">
        <div
          :style="style" class="flex flex-col items-center justify-center p-4" :class="{
            'bg-white': index % 2 === 0,
            'bg-gray-50': index % 2 === 1,
          }"
        >
          <span class="text-center">{{ list[index].value }}</span>
          <span>{{ list[index].name }}</span>
        </div>
      </template>
    </hi-virtual-list>
  </div>
</template>
