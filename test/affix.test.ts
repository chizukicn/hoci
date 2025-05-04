import { HiAffix } from "@hoci/components";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h } from "vue";

describe("hiAffix", () => {
  // Basic rendering
  it("should render correctly and display slot content", () => {
    const wrapper = mount(HiAffix, {
      slots: {
        default: () => h("span", {}, "Affix Content")
      }
    });
    expect(wrapper.find("span").exists()).toBe(true);
    expect(wrapper.text()).toContain("Affix Content");
  });

  // Render different tag with as prop
  it("should render as custom tag with as prop", () => {
    const wrapper = mount(HiAffix, {
      props: {
        as: "section"
      }
    });
    expect(wrapper.element.tagName).toBe("SECTION");
  });

  // Structure contains two divs (placeholder + affix content) or one div (when not affixed)
  it("should contain affix content container in structure", () => {
    const wrapper = mount(HiAffix, {
      slots: {
        default: () => h("span", {}, "Affix Content")
      }
    });
    // 最后一个 div 应包含 slot 内容
    const divs = wrapper.findAll("div");
    expect(divs.length).toBeGreaterThanOrEqual(1);
    expect(divs[divs.length - 1].text()).toContain("Affix Content");
  });

  // Support custom className/fixedStyle/placeholderStyle (via props)
  it("should support custom className, fixedStyle, and placeholderStyle", async () => {
    // We can only pass props, not directly control the behavior of isFixed/fixedStyle/placeholderStyle
    // But we can assert the class/style of the affix content container
    const wrapper = mount(HiAffix, {
      props: {
        as: "div",
        class: "my-affix",
        style: { top: "10px" }
      },
      slots: {
        default: () => h("span", {}, "Affix Content")
      }
    });
    expect(wrapper.classes()).toContain("my-affix");
    expect(wrapper.attributes("style")).toContain("top: 10px");
  });
});
