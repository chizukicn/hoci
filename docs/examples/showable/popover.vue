<script lang="ts" setup>
import { showableRef } from "hoci";
import { ref } from "vue";

const popoverRef = showableRef();
const openedBy = ref("");
</script>

<template>
  <div class="flex flex-col gap-4">
    <p v-if="openedBy" class="text-sm text-gray-600">
      上次打开方式：{{ openedBy }}
    </p>
    <div class="flex flex-wrap items-center gap-2">
      <button
        type="button"
        class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        @click="
          popoverRef?.show();
          openedBy = '外部按钮';
        "
      >
        外部打开 Popover
      </button>
      <hi-popover ref="popoverRef" popup-class="z-1000" trigger-event="click">
        <button
          type="button"
          class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
          @click="openedBy = '触发器'"
        >
          点击打开
        </button>
        <template #popup>
          <div class="bg-white rounded shadow-md px-4 py-3 min-w-48">
            <p class="font-medium mb-1">
              Popover 内容
            </p>
            <p class="text-sm text-gray-600">
              可与 showable 结合：通过 showableRef 绑定到 HiPopover，外部即可调用
              <code class="text-xs">popoverRef?.show()</code>
              打开。
            </p>
          </div>
        </template>
      </hi-popover>
    </div>
  </div>
</template>
