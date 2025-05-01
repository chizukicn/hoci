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
    return "0  B  ";
  }
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / k ** i).toFixed(2)} ${sizes[i]}`;
};
</script>

<template>
  <div class="demo-container">
    <hi-file-upload
      v-model="imageFile"
      accept=".jpg,.jpeg,.png"
      class="upload-demo"
    >
      <div class="upload-trigger">
        <div v-if="!imageFile">
          <i class="hi-icon-image" />
          <div class="upload-text">
            点击上传图片
          </div>
          <div class="upload-hint">
            支持 jpg、png 格式
          </div>
        </div>
        <div v-else class="preview-container">
          <img
            :src="imagePreview"
            class="image-preview"
            alt="预览图"
          >
          <div class="file-info">
            <div class="file-name">
              {{ imageFile.name }}
            </div>
            <div class="file-size">
              {{ formatFileSize(imageFile.size) }}
            </div>
          </div>
        </div>
      </div>
    </hi-file-upload>
  </div>
</template>

<style scoped>
.demo-container {
  width: 100%;
  max-width: 360px;
}

.upload-trigger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.upload-trigger:hover {
  border-color: #6366f1;
}

.hi-icon-image {
  font-size: 32px;
  color: #6b7280;
}

.upload-text {
  margin-top: 12px;
  color: #6b7280;
}

.upload-hint {
  margin-top: 4px;
  color: #9ca3af;
  font-size: 14px;
}

.preview-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.image-preview {
  max-width: 100%;
  max-height: 120px;
  object-fit: contain;
  border-radius: 4px;
}

.file-info {
  margin-top: 12px;
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
