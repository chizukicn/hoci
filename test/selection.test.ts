import { HiItem, HiSelection } from "@hoci/components";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h, nextTick, ref } from "vue";

describe("hiSelection", () => {
  // Test basic selection functionality
  it("should select single item correctly", async () => {
    const modelValue = ref("item1");
    const wrapper = mount(HiSelection, {
      props: {
        modelValue: modelValue.value,
        activeClass: "active",
      },
      slots: {
        default: [
          h(HiItem, { value: "item1" }),
          h(HiItem, { value: "item2" }),
        ],
      },
    });

    const items = wrapper.findAllComponents(HiItem);
    expect(items).toHaveLength(2);
    expect(items[0].classes()).toContain("active");
    expect(items[1].classes()).not.toContain("active");

    // Test clicking to change selection
    await items[1].trigger("click");
    await nextTick();
    expect(items[0].classes()).not.toContain("active");
    expect(items[1].classes()).toContain("active");
  });

  // Test multiple selection functionality
  it("should support multiple selection mode", async () => {
    const modelValue = ref(["item1"]);
    const wrapper = mount(HiSelection, {
      props: {
        modelValue: modelValue.value,
        multiple: true,
        activeClass: "active",
      },
      slots: {
        default: [
          h(HiItem, { value: "item1" }),
          h(HiItem, { value: "item2" }),
          h(HiItem, { value: "item3" }),
        ],
      },
    });

    const items = wrapper.findAllComponents(HiItem);
    expect(items[0].classes()).toContain("active");

    // Test multiple selection
    await items[1].trigger("click");
    await nextTick();
    expect(items[0].classes()).toContain("active");
    expect(items[1].classes()).toContain("active");
  });

  // Test clearable functionality
  it("should support clearing selection", async () => {
    const modelValue = ref("item1");
    const wrapper = mount(HiSelection, {
      props: {
        modelValue: modelValue.value,
        clearable: true,
        activeClass: "active",
      },
      slots: {
        default: [
          h(HiItem, { value: "item1" }),
          h(HiItem, { value: "item2" }),
        ],
      },
    });

    const items = wrapper.findAllComponents(HiItem);
    expect(items[0].classes()).toContain("active");

    // Test clicking selected item to clear selection
    await items[0].trigger("click");
    await nextTick();
    expect(items[0].classes()).not.toContain("active");
  });

  // Test disabled state
  it("should support disabled state", async () => {
    const modelValue = ref("item1");
    const wrapper = mount(HiSelection, {
      props: {
        modelValue: modelValue.value,
        activeClass: "active",
        disabledClass: "disabled",
      },
      slots: {
        default: [
          h(HiItem, { value: "item1" }),
          h(HiItem, { value: "item2", disabled: true }),
        ],
      },
    });

    const items = wrapper.findAllComponents(HiItem);
    expect(items[1].classes()).toContain("disabled");

    // Test clicking disabled item does not trigger selection
    await items[1].trigger("click");
    await nextTick();
    expect(items[1].classes()).not.toContain("active");
  });

  // Test custom activation event
  it("should support custom activation event", async () => {
    const modelValue = ref("item1");
    const wrapper = mount(HiSelection, {
      props: {
        modelValue: modelValue.value,
        activeClass: "active",
        activateEvent: "mouseenter",
      },
      slots: {
        default: [
          h(HiItem, { value: "item1" }),
          h(HiItem, { value: "item2" }),
        ],
      },
    });

    const items = wrapper.findAllComponents(HiItem);

    // Test mouseenter event triggers selection
    await items[1].trigger("mouseenter");
    await nextTick();
    expect(items[0].classes()).not.toContain("active");
    expect(items[1].classes()).toContain("active");
  });

  // Test multiple selection limit
  it("should support multiple selection limit", async () => {
    const modelValue = ref(["item1"]);
    const wrapper = mount(HiSelection, {
      props: {
        modelValue: modelValue.value,
        multiple: [1, 2], // Limit selection to 1-2 items
        activeClass: "active",
      },
      slots: {
        default: [
          h(HiItem, { value: "item1" }),
          h(HiItem, { value: "item2" }),
          h(HiItem, { value: "item3" }),
        ],
      },
    });

    const items = wrapper.findAllComponents(HiItem);

    // Test can select second item
    await items[1].trigger("click");
    await nextTick();
    expect(items[0].classes()).toContain("active");
    expect(items[1].classes()).toContain("active");

    // Test cannot select third item (exceeds limit)
    await items[2].trigger("click");
    await nextTick();
    expect(items[2].classes()).not.toContain("active");
  });

  // Test style class props
  it("should apply custom class names correctly", async () => {
    const modelValue = ref("item1");
    const wrapper = mount(HiSelection, {
      props: {
        modelValue: modelValue.value,
        activeClass: "custom-active",
        itemClass: "custom-item",
        unactiveClass: "custom-unactive",
        disabledClass: "custom-disabled",
      },
      slots: {
        default: [
          h(HiItem, { value: "item1" }),
          h(HiItem, { value: "item2" }),
          h(HiItem, { value: "item3", disabled: true }),
        ],
      },
    });

    const items = wrapper.findAllComponents(HiItem);

    // Test itemClass is applied to all items
    items.forEach((item) => {
      expect(item.classes()).toContain("custom-item");
    });

    // Test activeClass is applied to selected item
    expect(items[0].classes()).toContain("custom-active");

    // Test unactiveClass is applied to unselected items
    expect(items[1].classes()).toContain("custom-unactive");

    // Test disabledClass is applied to disabled item
    expect(items[2].classes()).toContain("custom-disabled");
  });

  // Test class names in multiple selection mode
  it("should apply class names correctly in multiple selection mode", async () => {
    const modelValue = ref(["item1", "item2"]);
    const wrapper = mount(HiSelection, {
      props: {
        modelValue: modelValue.value,
        multiple: true,
        activeClass: "multi-active",
        unactiveClass: "multi-unactive",
      },
      slots: {
        default: [
          h(HiItem, { value: "item1" }),
          h(HiItem, { value: "item2" }),
          h(HiItem, { value: "item3" }),
        ],
      },
    });

    const items = wrapper.findAllComponents(HiItem);

    // Test activeClass is applied to all selected items
    expect(items[0].classes()).toContain("multi-active");
    expect(items[1].classes()).toContain("multi-active");

    // Test unactiveClass is applied to unselected item
    expect(items[2].classes()).toContain("multi-unactive");
  });

  // Test dynamic class name changes
  it("should update class names when selection changes", async () => {
    const modelValue = ref("item1");
    const wrapper = mount(HiSelection, {
      props: {
        modelValue: modelValue.value,
        activeClass: "dynamic-active",
        unactiveClass: "dynamic-unactive",
      },
      slots: {
        default: [
          h(HiItem, { value: "item1" }),
          h(HiItem, { value: "item2" }),
        ],
      },
    });

    const items = wrapper.findAllComponents(HiItem);

    // Initial state
    expect(items[0].classes()).toContain("dynamic-active");
    expect(items[1].classes()).toContain("dynamic-unactive");

    // Change selection
    await items[1].trigger("click");
    await nextTick();

    // Test class names are updated
    expect(items[0].classes()).toContain("dynamic-unactive");
    expect(items[1].classes()).toContain("dynamic-active");
  });

  // Test empty class names
  it("should handle empty class names", () => {
    const modelValue = ref("item1");
    const wrapper = mount(HiSelection, {
      props: {
        modelValue: modelValue.value,
        activeClass: "",
        itemClass: "",
        unactiveClass: "",
        disabledClass: "",
      },
      slots: {
        default: [
          h(HiItem, { value: "item1" }),
          h(HiItem, { value: "item2", disabled: true }),
        ],
      },
    });

    const items = wrapper.findAllComponents(HiItem);

    // Test items still work without class names
    expect(items[0].classes()).toHaveLength(0);
    expect(items[1].classes()).toHaveLength(0);
  });
});
