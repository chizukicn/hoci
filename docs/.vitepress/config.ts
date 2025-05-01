import type { DefaultTheme } from "vitepress";
import { defineConfig } from "vitepress";
import { applyPlugins } from "./plugins/code";

function sidebars(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "快速开始",
      base: "/guide/",
      link: "quickstart"
    },
    {
      text: "组件",
      base: "/component/",
      items: componentSidebar()
    }
  ];
}

function componentSidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Icon (图标)",
      link: "icon"
    },
    {
      text: "Affix (固钉)",
      link: "affix"
    },
    {
      text: "Selection (选择器)",
      link: "selection"
    },
    {
      text: "Popover (浮动)",
      link: "popover"
    },
    {
      text: "File Upload (文件上传)",
      link: "file-upload"
    }
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
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "指南",
        items: [
          {
            text: "快速开始",
            link: "/guide/quickstart"
          },
          {
            text: "组件",
            link: "/component/icon"
          }
        ]
      },
    ],

    sidebar: {
      "/guide/": {
        base: "/guide/",
        items: sidebars()
      },
      "/component/": {
        base: "/component/",
        items: sidebars()
      }
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/chizukicn/hoci" }
    ]
  }
});
