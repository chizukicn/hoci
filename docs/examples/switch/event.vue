<script lang="ts" setup>
import type { ActivateEvent } from "hoci";

const activeEvents: {
  label: string;
  event: ActivateEvent;
}[] = [
  {
    label: "点击",
    event: "click"
  },
  {
    label: "鼠标进入",
    event: "mouseenter"
  },
  {
    label: "鼠标按下",
    event: "mousedown"
  },
  {
    label: "鼠标抬起",
    event: "mouseup"
  },
  {
    label: "双击",
    event: "dblclick"
  },
  {
    label: "右键点击",
    event: "contextmenu"
  },
  {
    label: "触摸开始",
    event: "touchstart"
  },
  {
    label: "触摸结束",
    event: "touchend"
  }
];
</script>

<template>
  <div class="flex gap-4 flex-wrap">
    <hi-switch
      v-for="({ label, event }, index) in activeEvents"
      :key="index"
      class="text-center flex-1/3 px-4 py-1 rounded-lg duration-300 select-none"
      active-class="bg-blue-500 text-white"
      unactive-class="bg-gray-200 text-gray-700 border border-gray-300"
      :activate-event="event"
    >
      {{ label }}&nbsp;({{ event }})
    </hi-switch>
  </div>
</template>
