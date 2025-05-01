<script setup lang="ts">
import { ref } from 'vue'

const file = ref<File>()

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]
}
</script>

<template>
  <hi-file-upload v-model="file" class="upload-demo">
    <div class="upload-trigger">
      <div v-if="!file">
        <i class="hi-icon-upload" />
        <div class="upload-text">点击上传文件</div>
      </div>
      <div v-else class="file-info">
        <div class="file-name">{{ file.name }}</div>
        <div class="file-size">{{ formatFileSize(file.size) }}</div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 180px;
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
}

.upload-text {
  margin-top: 12px;
  color: #6b7280;
}

.file-info {
  text-align: center;
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
</style>
