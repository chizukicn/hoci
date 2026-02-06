<script lang="ts" setup>
import { useDemoI18n } from "@demo-i18n";
import { ref } from "vue";

const activeNum = ref(1);
const { t } = useDemoI18n();
</script>

<template>
  <div>
    <hi-selection
      v-model="activeNum"
      active-class="bg-blue-300 text-white b-blue-300"
      item-class="py-1 px-2 rounded cursor-pointer b-1 b-solid duration-300"
      unactive-class="b-gray-300"
      disabled-class="b-gray-300 text-gray-3 cursor-not-allowed"
      class="space-x-3 flex items-center"
    >
      <hi-item :value="1">
        {{ t("Item 1", "选项 1") }}
      </hi-item>
      <hi-item :value="2">
        {{ t("Item 2", "选项 2") }}
      </hi-item>
      <hi-item :value="3">
        {{ t("Item 3", "选项 3") }}
      </hi-item>
      <hi-item disabled :value="4">
        {{ t("Disabled", "禁用") }}
      </hi-item>
    </hi-selection>
    <div class="mt-3">
      {{ t("Now activated", "当前激活") }}: {{ activeNum }}
    </div>
  </div>
</template>
