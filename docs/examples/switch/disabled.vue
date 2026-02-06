<script setup>
import { useDemoI18n } from "@demo-i18n";
import { ref } from "vue";

const checked = ref(false);
const { t } = useDemoI18n();
</script>

<template>
  <hi-switch v-model="checked" :disabled="true" disabled-class="text-#aaa bg-#f5f5f5 px-4 py-1 min-w-16 rounded-lg cursor-not-allowed">
    <template #default="{ active, isDisabled }">
      {{ isDisabled ? t("Disabled", "禁用") : active ? t("On", "开") : t("Off", "关") }}
    </template>
  </hi-switch>
</template>
