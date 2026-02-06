<script setup>
import { useDemoI18n } from "@demo-i18n";
import { ref } from "vue";

const checked = ref(false);
const { t } = useDemoI18n();
</script>

<template>
  <div class="flex items-center gap-4">
    <hi-switch
      v-model="checked"
      active-class="bg-blue-500 text-white shadow-md"
      unactive-class="bg-gray-200 text-gray-700 border border-gray-300"
      class="min-w-16 text-center px-4 py-1 rounded-lg duration-300 select-none cursor-pointer"
    >
      <template #default="{ active }">
        {{ active ? t("On", "开") : t("Off", "关") }}
      </template>
    </hi-switch>
  </div>
</template>
