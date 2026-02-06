<script lang="ts" setup>
import { useDemoI18n } from "@demo-i18n";

const { t } = useDemoI18n();
</script>

<template>
  <div class="space-y-3 affix-container h-90 of-y-auto w-full">
    <hi-affix :offset="30" target=".affix-container">
      <div class="px-6 text-white inline-flex border-box justify-center py-2 bg-blue-300 rounded-3">
        {{ t("Offset top 30px with container", "距顶部 30px 固定（指定容器）") }}
      </div>
    </hi-affix>
    <div class="w-full h-150 flex items-end">
      {{ t("This is a container with 150px height", "这是一个高度 150px 的容器") }}
    </div>
  </div>
</template>
