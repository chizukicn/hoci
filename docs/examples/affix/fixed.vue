<script lang="ts" setup>
import { useDemoI18n } from "@demo-i18n";

const { t } = useDemoI18n();
</script>

<template>
  <div class="space-y-3">
    <hi-affix :offset="30" position="bottom">
      <div class="px-6 text-white inline-flex border-box justify-center py-2 bg-blue-300 rounded-3">
        {{ t("Offset bottom 30px", "距底部 30px 固定") }}
      </div>
    </hi-affix>
  </div>
</template>
