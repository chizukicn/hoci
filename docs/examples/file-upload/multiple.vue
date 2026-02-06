<script setup lang="ts">
import { useDemoI18n } from "@demo-i18n";
import { ref } from "vue";

const files = ref<File[]>([]);
const { t } = useDemoI18n();

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
  <hi-file-upload v-model="files" multiple class="w-full max-w-360px">
    <div class="p-4 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer transition-colors duration-300 hover:border-indigo-500">
      <div v-if="files.length === 0">
        <i class="hi-icon-upload text-32px text-gray-500 block text-center" />
        <div class="mt-3 text-gray-500 text-center">
          {{ t("Click to upload multiple files", "点击上传多个文件") }}
        </div>
      </div>
      <div v-else class="flex flex-col gap-2">
        <div v-for="file in files" :key="file.name" class="p-3 bg-gray-50 rounded-md">
          <div>
            <div class="text-gray-900 font-medium mb-1">
              {{ file.name }}
            </div>
            <div class="text-gray-500 text-14px">
              {{ formatFileSize(file.size) }}
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center p-3 text-indigo-500 bg-gray-50 rounded-md mt-2">
          <i class="hi-icon-plus mr-2" />
          <span>{{ t("Add more", "继续添加") }}</span>
        </div>
      </div>
    </div>
  </hi-file-upload>
</template>
