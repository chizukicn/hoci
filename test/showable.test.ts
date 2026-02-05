import type { ShowableInstance } from "@hoci/shared";
import {
  onShowableHide,
  onShowableShow,
  showableRef,
  useShowableContextProvider,
  useShowableInstance
} from "@hoci/shared";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { h, nextTick } from "vue";

describe("showableRef", () => {
  it("should return shallowRef with null initial value", () => {
    const ref = showableRef<{ id: number }>();
    expect(ref.value).toBe(null);
  });

  it("should accept assigned ShowableInstance", () => {
    const ref = showableRef<{ id: number }>();
    const instance = { show: vi.fn(() => Promise.resolve()) };
    ref.value = instance;
    expect(ref.value).toBe(instance);
    ref.value.show({ id: 1 });
    expect(instance.show).toHaveBeenCalledWith({ id: 1 });
  });
});

describe("useShowableInstance (without provider)", () => {
  it("should throw when used without provider", () => {
    const Child = {
      name: "Child",
      setup() {
        useShowableInstance();
        return () => h("div");
      }
    };
    expect(() => mount(Child)).toThrow("useShowableContextStore must be used after useShowableContextProvider");
  });
});

describe("showable (with provider, only useShowableInstance)", () => {
  it("should open and close, sync visible and status via instance", async () => {
    const Child = {
      name: "Child",
      setup() {
        const instance = useShowableInstance();
        return { instance };
      },
      render: () => h("div")
    };
    const Provider = {
      setup() {
        useShowableContextProvider();
        return () => h(Child);
      }
    };
    const wrapper = mount(Provider);
    await nextTick();
    const instance = (wrapper.findComponent({ name: "Child" }).vm as unknown as { instance: ShowableInstance }).instance;

    expect(instance.visible.value).toBe(false);
    expect(instance.status.value).toBe("none");

    instance.show();
    await nextTick();
    expect(instance.visible.value).toBe(true);
    expect(instance.status.value).toBe("none");

    instance.confirm();
    await nextTick();
    expect(instance.visible.value).toBe(false);
    expect(instance.status.value).toBe("ok");

    instance.show();
    await nextTick();
    instance.close("none");
    await nextTick();
    expect(instance.visible.value).toBe(false);
    expect(instance.status.value).toBe("none");
  });

  it("useShowableInstance show/close/confirm/reject/cancel should update visible and status", async () => {
    const Child = {
      name: "Child",
      setup() {
        const instance = useShowableInstance();
        return { instance };
      },
      render: () => h("div")
    };
    const Provider = {
      setup() {
        useShowableContextProvider();
        return () => h(Child);
      }
    };
    const wrapper = mount(Provider);
    await nextTick();
    const { instance } = wrapper.findComponent({ name: "Child" }).vm as unknown as { instance: ShowableInstance };

    instance.show();
    await nextTick();
    expect(instance.visible.value).toBe(true);
    expect(instance.status.value).toBe("none");

    instance.confirm();
    await nextTick();
    expect(instance.visible.value).toBe(false);
    expect(instance.status.value).toBe("ok");

    instance.show();
    await nextTick();
    instance.reject();
    await nextTick();
    expect(instance.visible.value).toBe(false);
    expect(instance.status.value).toBe("reject");

    instance.show();
    await nextTick();
    instance.cancel();
    await nextTick();
    expect(instance.visible.value).toBe(false);
    expect(instance.status.value).toBe("cancel");

    instance.show();
    await nextTick();
    instance.close("none");
    await nextTick();
    expect(instance.visible.value).toBe(false);
    expect(instance.status.value).toBe("none");
  });

  it("onShowableShow should be called when show with parameters", async () => {
    const onShow = vi.fn();
    const Trigger = {
      name: "Trigger",
      setup() {
        const instance = useShowableInstance();
        return () =>
          h("button", {
            class: "trigger",
            onClick: () => instance.show({ id: 1 })
          });
      }
    };
    const Content = {
      name: "Content",
      setup() {
        onShowableShow(onShow);
        return () => h("div", { class: "content" });
      }
    };
    const Provider = {
      setup() {
        useShowableContextProvider();
        return () => h("div", [h(Trigger), h(Content)]);
      }
    };

    const wrapper = mount(Provider);
    await wrapper.find(".trigger").trigger("click");
    await nextTick();
    expect(onShow).toHaveBeenCalledWith({ id: 1 });
  });

  it("onShowableHide should be called when close with status", async () => {
    const onHide = vi.fn();
    const Child = {
      name: "Child",
      setup() {
        const instance = useShowableInstance();
        return { instance };
      },
      render(this: any) {
        return h("button", { onClick: () => this.instance.confirm() }, "confirm");
      }
    };
    const Provider = {
      setup() {
        useShowableContextProvider();
        onShowableHide(onHide);
        return () => h(Child);
      }
    };

    const wrapper = mount(Provider);
    await nextTick();
    const instance = (wrapper.findComponent({ name: "Child" }).vm as unknown as { instance: ShowableInstance }).instance;
    instance.show();
    await nextTick();
    await wrapper.find("button").trigger("click");
    await nextTick();
    expect(onHide).toHaveBeenCalledWith("ok");
  });

  it("useShowableInstance onConfirm/onReject/onCancel should be called when status changes", async () => {
    const onConfirm = vi.fn();
    const onReject = vi.fn();
    const onCancel = vi.fn();
    const Child = {
      name: "Child",
      setup() {
        const instance = useShowableInstance({ onConfirm, onReject, onCancel });
        return { instance };
      },
      render: () => h("div")
    };
    const Provider = {
      setup() {
        useShowableContextProvider();
        return () => h(Child);
      }
    };

    const wrapper = mount(Provider);
    await nextTick();
    const { instance } = wrapper.findComponent({ name: "Child" }).vm as unknown as { instance: ShowableInstance };
    instance.show();
    await nextTick();
    instance.confirm();
    await nextTick();
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onReject).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();

    instance.show();
    await nextTick();
    instance.reject();
    await nextTick();
    expect(onReject).toHaveBeenCalledTimes(1);

    instance.show();
    await nextTick();
    instance.cancel();
    await nextTick();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("useShowableInstance header option should sync to instance.header", async () => {
    const Child = {
      name: "Child",
      setup() {
        const instance = useShowableInstance({ header: "My Title" });
        return { instance };
      },
      render: () => h("div")
    };
    const Provider = {
      setup() {
        useShowableContextProvider();
        return () => h(Child);
      }
    };

    const wrapper = mount(Provider);
    await nextTick();
    const instance = (wrapper.findComponent({ name: "Child" }).vm as unknown as { instance: ShowableInstance }).instance;
    expect(instance.header.value).toBe("My Title");
  });

  it("useShowableInstance onShow option should be called when show", async () => {
    const onShow = vi.fn();
    const Child = {
      name: "Child",
      setup() {
        const instance = useShowableInstance({ onShow });
        return { instance };
      },
      render: () => h("div")
    };
    const Provider = {
      setup() {
        useShowableContextProvider();
        return () => h(Child);
      }
    };

    const wrapper = mount(Provider);
    await nextTick();
    const { instance } = wrapper.findComponent({ name: "Child" }).vm as unknown as { instance: ShowableInstance };
    instance.show({ id: 1 });
    await nextTick();
    expect(onShow).toHaveBeenCalledWith({ id: 1 });
  });

  it("useShowableInstance onHide option should be called when close", async () => {
    const onHide = vi.fn();
    const Child = {
      name: "Child",
      setup() {
        const instance = useShowableInstance({ onHide });
        return { instance };
      },
      render: () => h("div")
    };
    const Provider = {
      setup() {
        useShowableContextProvider();
        return () => h(Child);
      }
    };

    const wrapper = mount(Provider);
    await nextTick();
    const { instance } = wrapper.findComponent({ name: "Child" }).vm as unknown as { instance: ShowableInstance };
    instance.show();
    await nextTick();
    instance.close("ok");
    await nextTick();
    expect(onHide).toHaveBeenCalledWith("ok");
  });
});
