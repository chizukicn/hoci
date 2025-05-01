<script setup lang="ts">
import { ref } from "vue";

const files = ref<File[]>([]);

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
  <hi-file-upload v-model="files" multiple class="upload-demo">
    <div class="upload-trigger">
      <div v-if="files.length === 0">
        <i class="hi-icon-upload" />
        <div class="upload-text">
          点击上传多个文件
        </div>
      </div>
      <div v-else class="file-list">
        <div v-for="file in files" :key="file.name" class="file-item">
          <div class="file-info">
            <div class="file-name">
              {{ file.name }}
            </div>
            <div class="file-size">
              {{ formatFileSize(file.size) }}
            </div>
          </div>
        </div>
        <div class="upload-more">
          <i class="hi-icon-plus" />
          <span>继续添加</span>
        </div>
      </div>
    </div>
  </hi-file-upload>
</template>

<style scoped>
.upload-demo {
  width: 100%;
  max-width: 360px;
}

.upload-trigger {
  padding: 16px;
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.upload-trigger:hover {
  border-color: #6366f1;
}

.hi-icon-upload {
  font-size: 32px;
  color: #6b7280;
  text-align: center;
}

.upload-text {
  margin-top: 12px;
  color: #6b7280;
  text-align: center;
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.file-item {
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 6px;
}

.file-name {
  color: #111827;
  font-weight: 500;
  margin-bottom: 4px;
}

.file-size {
  color: #6b7280;
  font-size: 14px;
}

.upload-more {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  color: #6366f1;
  background-color: #f9fafb;
  border-radius: 6px;
  margin-top: 8px;
}

.hi-icon-plus {
  margin-right: 8px;
}
</style>
