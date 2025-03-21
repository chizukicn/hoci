<script lang="tsx">
import { HiAffix, HiConfigProvider, HiIcon, HiItem, HiSelection, HiSwitch, HiTabPane, HiTabs } from "hoci";
import { defineComponent, reactive, ref } from "vue";
import hociSvg from "./assets/hoci.svg";

const Tab1 = defineComponent({
  name: "Tab1",
  setup() {
    return () => (
      <div class="p-4">
        <HiSwitch as="span" class="cursor-pointer duration-200 select-none" activeClass="text-hex-f00">Tab 1</HiSwitch>
      </div>
    );
  }
});

export default defineComponent(() => {
  const selectedIndex = ref<number[] | number>(2);
  const logs = ref<string[]>([]);

  const selectionState = reactive({
    multiple: false,
    clearable: false
  });

  function log(...args: any[]) {
    logs.value.push(args.map((r) => {
      if (typeof r === "object") {
        return JSON.stringify(r);
      }
      return r;
    }).join(" "));

    // eslint-disable-next-line no-console
    console.log(...args);
  }

  function handleChange(index: number) {
    log("change", JSON.stringify(index));
    selectedIndex.value = index;
  }

  function clearLog() {
    logs.value.length = 0;
  }

  return () => {
    return (
      <div class="w-full p-4">
        <HiConfigProvider icon={{ size: 96 }}>
          <hi-icon class="text-green rounded w-12 h-12" src={hociSvg} />
          <HiIcon size={0} class="text-green rounded w-12 h-12" src={hociSvg} />
          <HiTabs
            keepAlive
            headerClass="flex space-x-3"
            itemClass="b-1 b-solid px-2 b-gray-3 rounded cursor-pointer"
            activeClass="b-transparent bg-blue-3 text-white"
            v-model={selectedIndex.value}
            class="mt-12"
          >
            {
              {
                default() {
                  return (
                    <>
                      <HiTabPane value={1} label="tab1">
                        <Tab1 />
                      </HiTabPane>
                      <HiTabPane value={2} label="tab2">
                        <div class="p-4">
                          <HiSwitch as="span" class="cursor-pointer duration-200 select-none" activeClass="text-hex-f00">Tab 2</HiSwitch>
                        </div>
                      </HiTabPane>
                    </>
                  );
                }
              }
            }
          </HiTabs>
          <HiAffix class="my-1" as="div" offset={30}>
            <div class="inline-block  p-4 bg-blue-200">
              Offset Top 30px
            </div>
          </HiAffix>
          <HiSelection
            {...selectionState}
            onChange={handleChange}
            v-model={selectedIndex.value}
            as="div"
            itemClass="duration-300 cursor-pointer px-2 py-1"
            class="flex space-x-4 items-center"
            activeClass="text-white bg-hex-f00"
            disabledClass="bg-gray-200 cursor-not-allowed line-through text-gray-500"
          >
            <HiItem value={1}>Item 1</HiItem>
            <HiItem value={2}>Item 2</HiItem>
            <HiItem disabled value={3}>Item 3</HiItem>
            <HiItem value={4}>Item 4</HiItem>
            <HiItem value={5}>Item 5</HiItem>
          </HiSelection>
          <div class="flex space-x-4 items-center">
            <HiSwitch as="span" v-model={selectionState.multiple} class="cursor-pointer mt-4 duration-200 select-none" activeClass="text-hex-f00">Multiple</HiSwitch>
            <HiSwitch as="span" v-model={selectionState.clearable} class="cursor-pointer mt-4 duration-200 select-none" activeClass="text-hex-f00">Clearable</HiSwitch>
          </div>
          <div>
            Selected:
            {JSON.stringify(selectedIndex.value)}
          </div>
          <div class="mt-4"></div>
          <div class="flex justify-between items-center">
            <div>Console: </div>
            <button onClick={clearLog} class="border-solid border-1 border-gray-50">Clear</button>
          </div>
          <div class="bg-gray-500 h-200 mt-2 text-white px-4 overflow-y-auto">
            {logs.value.map((log, index) => <div class="h-5 leading-5" key={index}>{log}</div>)}
          </div>
        </HiConfigProvider>
      </div>
    );
  };
});
</script>
