<script lang="ts" setup>
import { useDemoI18n } from "@demo-i18n";

const { t } = useDemoI18n();
</script>

<template>
  <div class="w-full flex flex-wrap gap-4">
    <hi-tooltip content="Simple tooltip text" class="bg-gray-800 text-white px-2 py-1 rounded text-sm">
      <button class="button b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1">
        {{ t("Hover (content prop)", "悬停（content 属性）") }}
      </button>
    </hi-tooltip>
    <hi-tooltip class="bg-gray-800 text-white px-2 py-1 rounded text-sm">
      <button class="button b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1">
        {{ t("Hover (popup slot)", "悬停（popup 插槽）") }}
      </button>
      <template #popup>
        <span>{{ t("Custom content via slot", "通过插槽自定义内容") }}</span>
      </template>
    </hi-tooltip>
    <hi-tooltip placement="bottom" class="bg-gray-800 text-white px-2 py-1 rounded text-sm">
      <span class="cursor-help underline decoration-dotted">
        {{ t("Bottom placement", "底部位置") }}
      </span>
      <template #popup>
        {{ t("Tooltip at bottom", "底部提示") }}
      </template>
    </hi-tooltip>
  </div>
</template>
