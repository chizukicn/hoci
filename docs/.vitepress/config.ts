import type { DefaultTheme } from "vitepress";
import { defineConfig } from "vitepress";
import { applyPlugins } from "./plugins/code";

function enSidebars(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Getting Started",
      base: "/guide/",
      link: "quickstart"
    },
    {
      text: "Components",
      base: "/component/",
      items: enComponentSidebar()
    }
  ];
}

function enComponentSidebar(): DefaultTheme.SidebarItem[] {
  return [
    { text: "Icon", link: "icon" },
    { text: "Affix", link: "affix" },
    { text: "Selection", link: "selection" },
    { text: "Showable", link: "showable" },
    { text: "Switch", link: "switch" },
    { text: "Popover", link: "popover" },
    { text: "File Upload", link: "file-upload" },
    { text: "Tabs", link: "tabs" },
    { text: "Virtual List", link: "virtual-list" }
  ];
}

function zhSidebars(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "快速开始",
      base: "/zh/guide/",
      link: "quickstart"
    },
    {
      text: "组件",
      base: "/zh/component/",
      items: zhComponentSidebar()
    }
  ];
}

function zhComponentSidebar(): DefaultTheme.SidebarItem[] {
  return [
    { text: "图标 (Icon)", link: "icon" },
    { text: "固钉 (Affix)", link: "affix" },
    { text: "选择器 (Selection)", link: "selection" },
    { text: "可显示 (Showable)", link: "showable" },
    { text: "开关 (Switch)", link: "switch" },
    { text: "浮动 (Popover)", link: "popover" },
    { text: "文件上传 (File Upload)", link: "file-upload" },
    { text: "标签页 (Tabs)", link: "tabs" },
    { text: "虚拟列表 (Virtual List)", link: "virtual-list" }
  ];
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "hoci",
  description: "a headless components library for vue3",
  markdown: {
    config: (md) => {
      applyPlugins(md);
    }
  },
  locales: {
    root: {
      label: "English",
      lang: "en",
      themeConfig: {
        nav: [
          {
            text: "Guide",
            items: [
              { text: "Quick Start", link: "/guide/quickstart" },
              { text: "Components", link: "/component/icon" }
            ]
          }
        ],
        sidebar: {
          "/guide/": {
            base: "/guide/",
            items: enSidebars()
          },
          "/component/": {
            base: "/component/",
            items: enSidebars()
          }
        }
      }
    },
    zh: {
      label: "中文",
      lang: "zh-CN",
      link: "/zh/guide/quickstart",
      themeConfig: {
        nav: [
          {
            text: "指南",
            items: [
              { text: "快速开始", link: "/zh/guide/quickstart" },
              { text: "组件", link: "/zh/component/icon" }
            ]
          }
        ],
        sidebar: {
          "/zh/guide/": {
            base: "/zh/guide/",
            items: zhSidebars()
          },
          "/zh/component/": {
            base: "/zh/component/",
            items: zhSidebars()
          }
        }
      }
    }
  },
  themeConfig: {
    socialLinks: [
      { icon: "github", link: "https://github.com/chizukicn/hoci" }
    ]
  }
});
