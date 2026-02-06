import type { Ref } from "vue";
import { useData } from "vitepress";
import { computed } from "vue";

/**
 * Composable for demo i18n. Use in docs/examples so demo text follows the current doc locale.
 * Returns a function t(en, zh) that returns the right string based on current lang.
 */
export function useDemoI18n(): {
  t: (en: string, zh: string) => string;
  lang: Ref<string>;
  isZh: Ref<boolean>;
} {
  const { lang } = useData();
  const isZh = computed(() => lang.value === "zh-CN");
  const t = (en: string, zh: string) => (isZh.value ? zh : en);
  return { t, lang, isZh };
}
