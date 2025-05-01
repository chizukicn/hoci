<script setup lang="ts">
import { ref, watch } from "vue";

const imageFile = ref<File>();
const imagePreview = ref<string>("");

watch(imageFile, (file) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.value = "";
  }
});

function formatFileSize(bytes: number) {
  if (bytes === 0) {
    return "0 B";
  }
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / k ** i).toFixed(2)} ${sizes[i]}`;
};
</script>

<template>
  <div class="w-full max-w-360px">
    <hi-file-upload
      v-model="imageFile"
      accept=".jpg,.jpeg,.png"
      class="w-full"
    >
      <div class="flex flex-col items-center justify-center h-200px border-2 border-dashed border-gray-200 rounded-lg cursor-pointer transition-colors duration-300 hover:border-indigo-500">
        <div v-if="!imageFile">
          <i class="hi-icon-image text-32px text-gray-500" />
          <div class="mt-3 text-gray-500">
            点击上传图片
          </div>
          <div class="mt-1 text-gray-400 text-14px">
            支持 jpg、png 格式
          </div>
        </div>
        <div v-else class="w-full h-full flex flex-col items-center justify-center p-4">
          <img
            :src="imagePreview"
            class="max-w-full max-h-120px object-contain rounded"
            alt="预览图"
          >
          <div class="mt-3 text-center">
            <div class="text-gray-900 font-medium mb-1">
              {{ imageFile.name }}
            </div>
            <div class="text-gray-500 text-14px">
              {{ formatFileSize(imageFile.size) }}
            </div>
          </div>
        </div>
      </div>
    </hi-file-upload>
  </div>
</template>
