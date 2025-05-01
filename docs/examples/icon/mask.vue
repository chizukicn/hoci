<script setup>
import hociSvg from "@/assets/apple.svg";
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <div class="text-gray-600 text-sm">
        Mask 模式（支持修改颜色）：
      </div>
      <div class="flex gap-4">
        <hi-icon :src="hociSvg" :size="24" :mask="true" color="red" />
        <hi-icon :src="hociSvg" :size="24" :mask="true" class="text-blue-500" />
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <div class="text-gray-600 text-sm">
        Background 模式（保持原始颜色）：
      </div>
      <div class="flex gap-4">
        <hi-icon :src="hociSvg" :size="24" :mask="false" />
        <hi-icon :src="hociSvg" :size="24" :mask="false" class="text-blue-500" />
      </div>
    </div>
  </div>
</template>
