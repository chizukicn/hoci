<script lang="ts" setup>
import type { ActivateEvent } from "hoci";
import { useDemoI18n } from "@demo-i18n";

const { t } = useDemoI18n();

const activeEvents: {
  labelEn: string;
  labelZh: string;
  event: ActivateEvent;
}[] = [
  { labelEn: "Click", labelZh: "点击", event: "click" },
  { labelEn: "Mouse Enter", labelZh: "鼠标进入", event: "mouseenter" },
  { labelEn: "Mouse Down", labelZh: "鼠标按下", event: "mousedown" },
  { labelEn: "Mouse Up", labelZh: "鼠标抬起", event: "mouseup" },
  { labelEn: "Double Click", labelZh: "双击", event: "dblclick" },
  { labelEn: "Right Click", labelZh: "右键点击", event: "contextmenu" },
  { labelEn: "Touch Start", labelZh: "触摸开始", event: "touchstart" },
  { labelEn: "Touch End", labelZh: "触摸结束", event: "touchend" }
];
</script>

<template>
  <div class="flex gap-4 flex-wrap">
    <hi-switch
      v-for="({ labelEn, labelZh, event }, index) in activeEvents"
      :key="index"
      class="text-center flex-1/3 px-4 py-1 rounded-lg duration-300 select-none"
      active-class="bg-blue-500 text-white"
      unactive-class="bg-gray-200 text-gray-700 border border-gray-300"
      :activate-event="event"
    >
      {{ t(labelEn, labelZh) }}&nbsp;({{ event }})
    </hi-switch>
  </div>
</template>
