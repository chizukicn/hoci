import { HiSwitch } from "@hoci/components";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h, nextTick, ref } from "vue";

describe("hiSwitch", () => {
  // Basic rendering and active state
  it("should render correctly and activate based on modelValue", async () => {
    const modelValue = ref(true);
    const wrapper = mount(HiSwitch, {
      props: {
        modelValue: modelValue.value,
        activeClass: "active"
      }
    });
    expect(wrapper.classes()).toContain("active");
  });

  // Toggle event
  it("should toggle active state and trigger update:modelValue on click", async () => {
    const modelValue = ref(false);
    const wrapper = mount(HiSwitch, {
      props: {
        "modelValue": modelValue.value,
        "onUpdate:modelValue": (val: boolean) => (modelValue.value = val)
      }
    });
    await wrapper.trigger("click");
    await nextTick();
    expect(modelValue.value).toBe(true);
  });

  // Disabled state
  it("should not toggle when disabled", async () => {
    const modelValue = ref(false);
    const wrapper = mount(HiSwitch, {
      props: {
        modelValue: modelValue.value,
        disabled: true
      }
    });
    await wrapper.trigger("click");
    await nextTick();
    expect(modelValue.value).toBe(false);
  });

  // Custom activation event
  it("should support custom activation event", async () => {
    const modelValue = ref(false);
    const wrapper = mount(HiSwitch, {
      props: {
        "modelValue": modelValue.value,
        "activateEvent": "mouseenter",
        "onUpdate:modelValue": (val: boolean) => (modelValue.value = val)
      }
    });
    await wrapper.trigger("mouseenter");
    await nextTick();
    expect(modelValue.value).toBe(true);
  });

  // Render different tag with as prop
  it("should render as custom tag with as prop", () => {
    const wrapper = mount(HiSwitch, {
      props: {
        as: "span"
      }
    });
    expect(wrapper.element.tagName).toBe("SPAN");
  });

  // Slot props pass-through
  it("slot should receive active and isDisabled", () => {
    const wrapper = mount(HiSwitch, {
      props: {
        modelValue: true,
        disabled: true
      },
      slots: {
        default: ({ active, isDisabled }) =>
          h("span", { class: { active, disabled: isDisabled } }, "内容")
      }
    });
    const span = wrapper.find("span");
    expect(span.classes()).toContain("active");
    expect(span.classes()).toContain("disabled");
  });

  // Test class application for activeClass, unactiveClass, disabledClass
  it("should apply activeClass, unactiveClass, and disabledClass correctly", async () => {
    const wrapper = mount(HiSwitch, {
      props: {
        modelValue: true,
        activeClass: "my-active",
        unactiveClass: "my-unactive",
        disabledClass: "my-disabled",
        disabled: false
      }
    });
    // Active state
    expect(wrapper.classes()).toContain("my-active");
    expect(wrapper.classes()).not.toContain("my-unactive");
    expect(wrapper.classes()).not.toContain("my-disabled");

    // Toggle to inactive
    await wrapper.setProps({ modelValue: false });
    await nextTick();
    expect(wrapper.classes()).toContain("my-unactive");
    expect(wrapper.classes()).not.toContain("my-active");
    expect(wrapper.classes()).not.toContain("my-disabled");

    // Toggle to disabled
    await wrapper.setProps({ disabled: true });
    await nextTick();
    expect(wrapper.classes()).toContain("my-disabled");
  });
});
