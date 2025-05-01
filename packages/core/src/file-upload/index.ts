import type { PropType } from "vue";
import { defineHookComponent, defineHookEmits, defineHookProps, elementRef } from "@hoci/shared";
import { useEventListener } from "@vueuse/core";
import { ref, watch } from "vue";

export const fileUploadProps = defineHookProps({
  modelValue: {
    type: [File, Array] as PropType<File | File[]>,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: false
  }
});

export const fileUploadEmits = defineHookEmits([
  "update:modelValue",
  "change"
]);

export type HiFileUploadProps = typeof fileUploadProps;

export interface HiFileUploadSlotData {
  files: File[];
}

export const useFileUpload = defineHookComponent({
  props: fileUploadProps,
  emits: fileUploadEmits,
  setup(props, { emit }) {
    const fileInputRef = elementRef<HTMLInputElement>();
    const files = ref<File[]>([]);

    watch(props.modelValue, (value) => {
      if (value instanceof File) {
        files.value.push(value);
      } else if (Array.isArray(value)) {
        files.value.push(...value);
      }
      if (props.multiple) {
        files.value.splice(1, files.value.length - 1);
      }
    }, {
      immediate: true,
      deep: true
    });

    const openFileInput = () => {
      fileInputRef.value?.click();
    };

    useEventListener(fileInputRef, "change", (event: Event) => {
      const newFiles = (event.target as HTMLInputElement).files;
      let value: File | File[] = [];
      if (newFiles) {
        if (props.multiple) {
          value = Array.from(newFiles);
          files.value.push(...value);
        } else {
          value = Array.from(newFiles)[0];
          files.value = value ? [value] : [];
        }
      }
      emit("update:modelValue", value);
      emit("change", value);
    });

    return {
      fileInputRef,
      files,
      openFileInput
    };
  }
});
