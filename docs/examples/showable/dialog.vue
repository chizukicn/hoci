<script lang="tsx">
import {
  onShowableHide,
  showableRef,
  useShowableContextProvider,
  useShowableInstance
} from "hoci";
import { defineComponent, ref, Teleport } from "vue";

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

    return () => (
      <>
        <div class="text-lg font-semibold mb-4">
          {header.value || "提示"}
        </div>
        <div class="text-gray-600 mb-6">
          这里是弹窗内容。
        </div>
        <div class="flex justify-end gap-2 flex-wrap">
          <button
            class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
            onClick={cancel}
          >
            取消
          </button>
          <button
            class="px-4 py-2 rounded border border-amber-300 hover:bg-amber-50 text-amber-700"
            onClick={reject}
          >
            拒绝
          </button>
          <button
            class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            onClick={confirm}
          >
            确认
          </button>
        </div>
      </>
    );
  }
});

// Dialog 作为弹出的 Wrapper 层
const Dialog = defineComponent({
  setup(_, { expose }) {
    const { visible, cancel, show } = useShowableContextProvider();

    // 获取 showable 实例来控制显示
    expose({
      show
    });

    return () => (
      <Teleport to="body">
        <div
          v-show={visible.value}
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={cancel}
        >
          <div
            class="bg-white rounded-lg shadow-lg p-6 min-w-80 max-w-md"
            onClick={(e: Event) => e.stopPropagation()}
          >
            <DialogContent />
          </div>
        </div>
      </Teleport>
    );
  }
});

export default defineComponent({
  setup() {
    return () => (
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <button
            class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 w-fit"
            onClick={() => dialogRef.value?.show()}
          >
            打开弹窗
          </button>
          {lastResult.value
            ? (
                <div class="text-sm text-gray-600">
                  上次结果：
                  {lastResult.value}
                </div>
              )
            : null}
        </div>
        <Dialog ref={dialogRef} />
      </div>
    );
  }
});
</script>
