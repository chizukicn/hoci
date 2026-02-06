<script lang="ts">
import {
  onShowableHide,
  showableRef,
  useShowableContextProvider,
  useShowableInstance
} from "hoci";
import { defineComponent, h, ref, Teleport } from "vue";

// 创建 showableRef 用于外部控制
const dialogRef = showableRef();

// 记录弹窗按钮点击结果
const lastResult = ref("");

const statusText: Record<string, string> = {
  none: "关闭",
  ok: "确认",
  cancel: "取消",
  reject: "拒绝"
};

// 弹窗的具体内容
const DialogContent = defineComponent({
  setup() {
    const instance = useShowableInstance({
      header: "提示"
    });
    const { header, confirm, reject, cancel } = instance;

    onShowableHide((status) => {
      lastResult.value = `点击了：${statusText[status] ?? status}`;
    });

    return () =>
      h("div", [
        h("div", { class: "text-lg font-semibold mb-4" }, header.value || "提示"),
        h("div", { class: "text-gray-600 mb-6" }, "这里是弹窗内容。"),
        h("div", { class: "flex justify-end gap-2 flex-wrap" }, [
          h(
            "button",
            {
              class: "px-4 py-2 rounded border border-gray-300 hover:bg-gray-50",
              onClick: cancel
            },
            "取消"
          ),
          h(
            "button",
            {
              class: "px-4 py-2 rounded border border-amber-300 hover:bg-amber-50 text-amber-700",
              onClick: reject
            },
            "拒绝"
          ),
          h(
            "button",
            {
              class: "px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600",
              onClick: confirm
            },
            "确认"
          )
        ])
      ]);
  }
});

// Dialog 作为弹出的 Wrapper 层
const Dialog = defineComponent({
  setup(_, { expose }) {
    const { visible, cancel, show, close } = useShowableContextProvider();

    expose({
      show,
      close
    });

    return () => {
      if (!visible.value) {
        return null;
      }
      return h(Teleport, { to: "body" }, [
        h("div", {
          class: "fixed inset-0 bg-black/50 flex items-center justify-center z-50",
          onClick: cancel
        }, [
          h("div", {
            class: "bg-white rounded-lg shadow-lg p-6 min-w-80 max-w-md",
            onClick: (e: Event) => e.stopPropagation()
          }, [
            h(DialogContent)
          ])
        ])
      ]);
    };
  }
});

export default defineComponent({
  setup() {
    return () =>
      h("div", { class: "flex flex-col gap-4" }, [
        h("div", { class: "flex flex-col gap-2" }, [
          lastResult.value
            ? h("div", { class: "text-sm text-gray-600" }, [
                "上次结果：",
                lastResult.value
              ])
            : null,
          h(
            "button",
            {
              class: "px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 w-fit",
              onClick: () => dialogRef.value?.show()
            },
            "打开弹窗"
          )
        ]),
        h(Dialog, { ref: dialogRef })
      ]);
  }
});
</script>
