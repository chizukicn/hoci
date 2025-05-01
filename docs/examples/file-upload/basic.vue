<script setup lang="ts">
import { ref } from "vue";
// @ts-nocheck
const file = ref<File>();

function formatFileSize(bytes: number) {
  if (bytes === 0) {
    return "0 B";
  }
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / k ** i).toFixed(2)} ${sizes[i]}`;
}
</script>

<template>
  <hi-file-upload v-model="file" class="w-full max-w-360px">
    <div class="flex flex-col items-center justify-center h-180px border-2 border-dashed border-gray-200 rounded-lg cursor-pointer transition-colors duration-300 hover:border-indigo-500">
      <div v-if="!file">
        <i class="hi-icon-upload text-32px text-gray-500" />
        <div class="mt-3 text-gray-500">
          点击上传文件
        </div>
      </div>
      <div v-else class="text-center">
        <div class="text-gray-900 font-medium mb-1">
          {{ file.name }}
        </div>
        <div class="text-gray-500 text-14px">
          {{ formatFileSize(file.size) }}
        </div>
      </div>
    </div>
  </hi-file-upload>
</template>
