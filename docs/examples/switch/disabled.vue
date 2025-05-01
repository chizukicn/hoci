<script setup>
import { ref } from "vue";

const checked = ref(false);
</script>

<template>
  <hi-switch v-model="checked" :disabled="true" disabled-class="text-#aaa bg-#f5f5f5 px-4 py-1 min-w-16 rounded-lg cursor-not-allowed">
    <template #default="{ active, isDisabled }">
      {{ isDisabled ? "禁用" : active ? "开" : "关" }}
    </template>
  </hi-switch>
</template>
