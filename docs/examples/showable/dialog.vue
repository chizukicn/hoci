<script lang="tsx">
import {
  showableRef,
  useShowableContextProvider,
  useShowableInstance
} from "hoci";
import { defineComponent, Teleport } from "vue";

// 创建 showableRef 用于外部控制
const dialogRef = showableRef();

// 弹窗的具体内容
const DialogContent = defineComponent({
  setup() {
    const instance = useShowableInstance({
      header: "确认删除"
    });
    const { header, confirm, cancel } = instance;

    return () => (
      <>
        <div class="text-lg font-semibold mb-4">
          {header.value || "提示"}
        </div>
        <div class="text-gray-600 mb-6">
          确定要删除这个项目吗？此操作不可撤销。
        </div>
        <div class="flex justify-end gap-2">
          <button
            class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
            onClick={cancel}
          >
            取消
          </button>
          <button
            class="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            onClick={confirm}
          >
            确认删除
          </button>
        </div>
      </>
    );
  }
});

// Dialog 作为弹出的 Wrapper 层
const Dialog = defineComponent({
  setup() {
    const { visible, cancel } = useShowableContextProvider();

    // 获取 showable 实例来控制显示
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
        <button
          class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => dialogRef.value?.show()}
        >
          打开弹窗
        </button>
        <Dialog ref={dialogRef} />
      </div>
    );
  }
});
</script>
