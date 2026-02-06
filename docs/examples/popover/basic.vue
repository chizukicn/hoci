<script lang="ts" setup>
import { useDemoI18n } from "@demo-i18n";

const { t } = useDemoI18n();
</script>

<template>
  <div class="w-full flex space-x-3">
    <hi-popover trigger-event="click">
      <button class="button b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1">
        {{ t("Click", "点击") }}
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover trigger-event="dblclick">
      <button class="button b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1">
        {{ t("Double Click", "双击") }}
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover trigger-event="mousedown">
      <button class="button b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1">
        {{ t("Mouse Down", "鼠标按下") }}
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover trigger-event="hover">
      <button class="button b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1">
        {{ t("Hover", "悬停") }}
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover trigger-event="contextmenu">
      <button class="button b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1">
        {{ t("Context Menu", "右键菜单") }}
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover trigger-event="touch" class="">
      <button class="button focus:b-blue-1 b-1 b-solid b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1">
        {{ t("Touch", "触摸") }}
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover trigger-event="focus" class="">
      <button class="button focus:b-blue-1 b-1 b-solid b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1">
        {{ t("Focus", "聚焦") }}
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
        </div>
      </template>
    </hi-popover>
  </div>
</template>
