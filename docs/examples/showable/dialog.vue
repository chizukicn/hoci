<script lang="ts">
import { useDemoI18n } from "@demo-i18n";
import {
  onShowableHide,
  showableRef,
  useShowableContextProvider,
  useShowableInstance
} from "hoci";
import { defineComponent, h, ref, Teleport } from "vue";

const dialogRef = showableRef();
const lastResult = ref("");

const statusTextMap = {
  en: { none: "Closed", ok: "Confirm", cancel: "Cancel", reject: "Reject" },
  zh: { none: "关闭", ok: "确认", cancel: "取消", reject: "拒绝" }
};

const DialogContent = defineComponent({
  setup() {
    const instance = useShowableInstance({
      header: "Prompt"
    });
    const { header, confirm, reject, cancel } = instance;
    const { t, lang } = useDemoI18n();

    onShowableHide((status) => {
      const statusText = lang.value === "zh-CN" ? statusTextMap.zh : statusTextMap.en;
      lastResult.value = lang.value === "zh-CN"
        ? `点击了：${statusText[status as keyof typeof statusTextMap.zh] ?? status}`
        : `Clicked: ${statusText[status as keyof typeof statusTextMap.en] ?? status}`;
    });

    return () => {
      const headerLabel = t("Prompt", "提示");
      const contentLabel = t("This is the dialog content.", "这里是弹窗内容。");
      return h("div", [
        h("div", { class: "text-lg font-semibold mb-4" }, header.value || headerLabel),
        h("div", { class: "text-gray-600 mb-6" }, contentLabel),
        h("div", { class: "flex justify-end gap-2 flex-wrap" }, [
          h(
            "button",
            {
              class: "px-4 py-2 rounded border border-gray-300 hover:bg-gray-50",
              onClick: cancel
            },
            t("Cancel", "取消")
          ),
          h(
            "button",
            {
              class: "px-4 py-2 rounded border border-amber-300 hover:bg-amber-50 text-amber-700",
              onClick: reject
            },
            t("Reject", "拒绝")
          ),
          h(
            "button",
            {
              class: "px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600",
              onClick: confirm
            },
            t("Confirm", "确认")
          )
        ])
      ]);
    };
  }
});

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
    const { t } = useDemoI18n();
    return () =>
      h("div", { class: "flex flex-col gap-4" }, [
        h("div", { class: "flex flex-col gap-2" }, [
          lastResult.value
            ? h("div", { class: "text-sm text-gray-600" }, [
                t("Last result: ", "上次结果："),
                lastResult.value
              ])
            : null,
          h(
            "button",
            {
              class: "px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 w-fit",
              onClick: () => dialogRef.value?.show()
            },
            t("Open dialog", "打开弹窗")
          )
        ]),
        h(Dialog, { ref: dialogRef })
      ]);
  }
});
</script>
