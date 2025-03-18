import type { SharedConfig } from "@hoci/shared";
import type { PropType } from "vue";
import { defineHookProps } from "@hoci/shared";

export const configProviderProps = defineHookProps({
  icon: {
    type: Object as PropType<Partial<SharedConfig["icon"]>>
  },
  activateEvent: {
    type: String as PropType<Partial<SharedConfig["activateEvent"]>>
  }
});
