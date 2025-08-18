import type { PropType } from "vue";
import { defineHookComponent, defineHookEmits, defineHookProps, elementRef, toArray } from "@hoci/shared";
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

    watch(() => toArray(props.modelValue), (value) => {
      files.value = value;
    }, {
      immediate: true,
      deep: true
    });

    const openFileInput = () => {
      fileInputRef.value?.click();
    };

    const toModelValue = (files: File[]): File | File[] | null => {
      if (props.multiple) {
        return files;
      }
      if (files.length) {
        return files[files.length - 1];
      }
      return null;
    };

    useEventListener(fileInputRef, "change", (event: Event) => {
      const input = event.target as HTMLInputElement;
      const newFiles: File[] = Array.from(input.files ?? []);
      if (newFiles.length) {
        if (props.multiple) {
          files.value.push(...newFiles);
        } else {
          files.value = newFiles.slice(newFiles.length - 1);
        }
      }
      input.value = "";
      const value = toModelValue(files.value);
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
