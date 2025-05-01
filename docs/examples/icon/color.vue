<script setup>
import hociSvg from "@/assets/apple.svg";
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <div class="text-gray-600 text-sm">
        使用 color 属性设置颜色：
      </div>
      <div class="flex gap-4">
        <hi-icon :src="hociSvg" :size="24" color="red" />
        <hi-icon :src="hociSvg" :size="24" color="blue" />
        <hi-icon :src="hociSvg" :size="24" color="green" />
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <div class="text-gray-600 text-sm">
        使用 CSS color 属性设置颜色（支持 hover 效果）：
      </div>
      <div class="flex gap-4">
        <hi-icon :src="hociSvg" :size="24" class="text-red-500 hover:text-red-700 transition-colors" />
        <hi-icon :src="hociSvg" :size="24" class="text-blue-500 hover:text-blue-700 transition-colors" />
        <hi-icon :src="hociSvg" :size="24" class="text-green-500 hover:text-green-700 transition-colors" />
      </div>
    </div>
  </div>
</template>
