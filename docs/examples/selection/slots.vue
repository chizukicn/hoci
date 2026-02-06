<script setup>
import { useDemoI18n } from "@demo-i18n";

const { t } = useDemoI18n();
</script>

<template>
  <div>
    <hi-selection
      item-class="py-1 px-2 rounded cursor-pointer duration-300 flex items-center space-x-1"
      disabled-class="b-gray-300 text-gray-3 cursor-not-allowed"
      class="space-x-3 flex items-center"
    >
      <hi-item v-for="i in 4" :key="i" :disabled="i === 4">
        <template #default="scope">
          <div :class="scope.active ? 'i-carbon:checkbox-checked' : 'i-carbon-checkbox'" />
          <div>{{ t("checkbox", "复选框") }} {{ i }}</div>
        </template>
      </hi-item>
    </hi-selection>
  </div>
</template>
