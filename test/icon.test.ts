import { HiIcon } from "@hoci/components";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("hiIcon", () => {
  // Render different tag with as prop
  it("should render as custom tag with as prop", () => {
    const wrapper = mount(HiIcon, {
      props: { as: "span", src: "/test.svg" }
    });
    const element = wrapper.element as HTMLElement;
    expect(element.tagName).toEqual("SPAN");
  });

  // width/height props effect
  it("should apply style props correctly", () => {
    const wrapper = mount(HiIcon, {
      props: {
        width: 40,
        height: 20,
        src: "/test.svg",
        style: { marginLeft: "10px" },
        color: "red",
        class: "test-class"
      }
    });
    const style = wrapper.attributes("style") || "";
    expect(style).toMatch(/width:\s?40(px)?/);
    expect(style).toMatch(/height:\s?20(px)?/);
    expect(style).toMatch(/margin-left:\s?10px/);
    expect(style).toMatch(/color:\s?red/);
    expect(wrapper.classes()).toContain("test-class");
  });

  // mask prop effect
  it("should have mask related style when mask prop is true", () => {
    const wrapper = mount(HiIcon, {
      props: { mask: true, src: "/test.svg" }
    });
    // 这里只能断言 style 存在，具体样式依赖 useIcon 实现
    expect(wrapper.attributes("style")).toMatch(/mask:\s?var\(--icon-url\)/);
  });
});
