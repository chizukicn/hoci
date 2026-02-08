import { fileUploadEmits, fileUploadProps, useFileUpload } from "@hoci/core";
import { asProps } from "@hoci/shared";
import { defineComponent, h, renderSlot } from "vue";

export const HiFileUpload = defineComponent({
  name: "HiFileUpload",
  props: {
    ...fileUploadProps,
    ...asProps,
    accept: {
      type: String,
      default: "*/*"
    },
  },
  emits: fileUploadEmits,
  setup(props, context) {
    const { slots } = context;
    const { fileInputRef, files, openFileInput } = useFileUpload(props, context);
    return () => {
      return h(props.as, {
        onClick: openFileInput
      }, [
        h("input", {
          ref: fileInputRef,
          type: "file",
          accept: props.accept,
          multiple: props.multiple,
          style: { display: "none" }
        }),
        renderSlot(slots, "default", {
          files: files.value
        })
      ]);
    };
  }
});
