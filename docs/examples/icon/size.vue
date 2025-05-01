<script setup>
import hociSvg from "@/assets/apple.svg";
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <div class="text-gray-600 text-sm">
        使用 size 属性设置尺寸：
      </div>
      <div class="flex gap-4 items-center">
        <hi-icon class="text-blue-500" :src="hociSvg" :size="16" />
        <hi-icon class="text-blue-500" :src="hociSvg" :size="24" />
        <hi-icon class="text-blue-500" :src="hociSvg" :size="32" />
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <div class="text-gray-600 text-sm">
        使用 width/height 属性设置尺寸：
      </div>
      <div class="flex gap-4 items-center">
        <hi-icon class="text-green-500" :src="hociSvg" :width="16" :height="16" />
        <hi-icon class="text-green-500" :src="hociSvg" :width="24" :height="24" />
        <hi-icon class="text-green-500" :src="hociSvg" :width="32" :height="32" />
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <div class="text-gray-600 text-sm">
        使用 CSS 设置尺寸：
      </div>
      <div class="flex gap-4 items-center">
        <hi-icon class="text-purple-500 w-4 h-4" :src="hociSvg" />
        <hi-icon class="text-purple-500 w-6 h-6" :src="hociSvg" />
        <hi-icon class="text-purple-500 w-8 h-8" :src="hociSvg" />
      </div>
    </div>
  </div>
</template>
