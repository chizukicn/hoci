<script setup>
import { ref } from "vue";

const active1 = ref("tab1");
const active2 = ref("tab1");
const list = [
  { name: "tab1", label: "标签一" },
  { name: "tab2", label: "标签二" },
  { name: "tab3", label: "标签三" }
];
</script>

<template>
  <div>
    <hi-tabs
      v-model="active1"
      header-class="flex border-b border-gray-200 bg-white"
      item-class="px-4 py-2 cursor-pointer text-gray-600 hover:text-blue-600 transition-colors border-b-2 border-transparent"
      active-class="!text-blue-600 !border-blue-600 font-bold"
      unactive-class=""
      content-class="p-6 border border-t-0 border-gray-200 bg-white rounded-b-lg"
    >
      <hi-tab-pane v-for="item in list" :key="item.name" :value="item.name" :label="item.label">
        <div>
          这里是 {{ item.label }} 的内容。
        </div>
      </hi-tab-pane>
    </hi-tabs>
    <hi-tabs
      v-model="active2"
      header-class="flex border-b border-gray-200 bg-white"
      item-class="px-4 py-2 cursor-pointer text-gray-600 hover:text-blue-600 transition-colors border-b-2 border-transparent"
      active-class="!text-blue-600 !border-blue-600 font-bold"
      unactive-class=""
    >
      <hi-item v-for="item in list" :key="item.name" :value="item.name" :label="item.label" />
      <template #content>
        <div class="p-6 border border-t-0 border-gray-200 bg-white rounded-b-lg">
          只需要头部内容
        </div>
      </template>
    </hi-tabs>
  </div>
</template>
