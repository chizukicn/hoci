<script lang="tsx" setup>
import { useDemoI18n } from "@demo-i18n";

const { t } = useDemoI18n();
</script>

<template>
  <div class="w-full" :style="{ position: 'relative', height: '280px' }">
    <hi-popover :style="{ position: 'absolute', top: '0', left: '70px' }" class="button b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1" placement="top-left">
      <button>
        {{ t("Top-Left", "左上") }}
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '0', left: '180px' }" class="button b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1" placement="top">
      <button>
        {{ t("TOP", "上") }}
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '0', left: '290px' }" class="button b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1" placement="top-right">
      <button>
        {{ t("Top-Right", "右上") }}
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '240px', left: '70px' }" class="button b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1" placement="bottom-left">
      <button>
        {{ t("Bottom-Left", "左下") }}
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '240px', left: '180px' }" class="button b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1" placement="bottom">
      <button>
        {{ t("BOTTOM", "下") }}
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '240px', left: '290px' }" class="button b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1" placement="bottom-right">
      <button>
        {{ t("Bottom-Right", "右下") }}
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '60px', left: '10px' }" class="button b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1" placement="left-top">
      <button>
        {{ t("Left-Top", "左上") }}
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '120px', left: '10px' }" class="button b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1" placement="left">
      <button>
        {{ t("LEFT", "左") }}
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '180px', left: '10px' }" class="button b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1" placement="left-bottom">
      <button>
        {{ t("Left-Bottom", "左下") }}
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '60px', left: '350px' }" class="button b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1" placement="right-top">
      <button>
        {{ t("Right-Top", "右上") }}
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '120px', left: '350px' }" class="button b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1" placement="right">
      <button>
        {{ t("RIGHT", "右") }}
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '180px', left: '350px' }" class="button b-1 b-gray-100 bg-gray-100 b-solid rounded-md px-2 py-1" placement="right-bottom">
      <button>
        {{ t("Right-Bottom", "右下") }}
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
          <p>{{ t("Here is the text content", "这里是文本内容") }}</p>
        </div>
      </template>
    </hi-popover>
  </div>
</template>
