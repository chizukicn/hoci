import { HiPopover } from "@hoci/components";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h, nextTick } from "vue";

describe("hiPopover", () => {
  // Basic rendering and default slot
  it("should render correctly and display default slot content", () => {
    const wrapper = mount(HiPopover, {
      slots: {
        default: () => h("button", {}, "触发按钮")
      },
    });
    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.text()).toContain("触发按钮");
  });

  // Render popup slot content
  it("should render popup slot content", async () => {
    const wrapper = mount(HiPopover, {
      slots: {
        popup: () => h("div", {}, "Popup Content"),
        default: () => h("button", {}, "Trigger Button")
      },
      props: {
        triggerEvent: "click"
      },
      global: {
        stubs: {
          teleport: true
        }
      }
    });
    await wrapper.trigger("click");
    expect(wrapper.html()).toContain("Popup Content");
  });

  // Render different tag with as prop
  it("should render as custom tag with as prop", () => {
    const wrapper = mount(HiPopover, {
      props: {
        as: "section"
      }
    });
    expect(wrapper.element.tagName).toBe("SECTION");
  });

  // popupClass and popupStyle application
  it("should apply popupClass and popupStyle to popup layer", async () => {
    const wrapper = mount(HiPopover, {
      props: {
        popupClass: "my-popup",
        triggerEvent: "click"
      },
      slots: {
        default: () => h("button", {}, "Trigger Button"),
        popup: () => h("div", {}, "Popup Content")
      },
      global: {
        stubs: {
          teleport: true
        }
      }
    });
    await wrapper.trigger("click");
    const popup = wrapper.find(".my-popup");
    expect(popup.exists()).toBe(true);
    expect(popup.attributes("style")).toContain(`visibility: visible;`);
  });

  // Render to body when teleport is true
  it("should render popup to body when teleport is true", async () => {
    const wrapper = mount(HiPopover, {
      props: {
        teleport: true
      },
      slots: {
        popup: () => h("div", {}, "Popup Content")
      },
      attachTo: document.body
    });
    await nextTick();
    // Teleport renders to body, body should have popup content
    expect(document.body.innerHTML).toContain("Popup Content");
    wrapper.unmount();
  });
});
