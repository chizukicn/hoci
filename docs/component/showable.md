# Showable

Shared state and lifecycle for show/hide content (e.g. dialogs, drawers). Built on `createInjectionState`: the parent provides context and children get the same `show/close`, `status`, etc.

Import from `hoci`:

```ts
import {
  onShowableHide,
  onShowableShow,
  showableRef,
  useShowableContextProvider,
  useShowableInstance
} from "hoci";
```

## Quick start

```vue
<script setup>
import {
  showableRef,
  useShowableContextProvider,
  useShowableInstance
} from "hoci";
import { defineComponent, h } from "vue";

const dialogRef = showableRef();

const Provider = defineComponent({
  setup(_, { expose }) {
    const { show, close } = useShowableContextProvider();
    expose({ show, close });
    return () => h(Content);
  }
});

const Content = defineComponent({
  setup() {
    const instance = useShowableInstance();
    const {
      show,
      close,
      confirm,
      reject,
      cancel,
      visible,
      status
    } = instance;

    return () => h("div", { class: "flex flex-col gap-2" }, [
      h("div", { class: "flex gap-2" }, [
        h("button", { onClick: () => show() }, "Open"),
        h("button", { onClick: () => close() }, "Close"),
        h("button", { onClick: confirm }, "Confirm"),
        h("button", { onClick: cancel }, "Cancel")
      ]),
      h("div", `visible: ${visible.value}, status: ${status.value}`)
    ]);
  }
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <button @click="dialogRef?.show()">
      Open from outside
    </button>
    <Provider ref="dialogRef" />
  </div>
</template>
```

## Dialog example

A full dialog example using `useShowableInstance` for visibility and status.

::: tip Expose show
In the provider (wrapper) component you **must** call `expose({ show })` so that a template ref can call `dialogRef.value?.show()`. Without it, refs won’t have access to `show`.
:::

<demo src="../examples/showable/dialog.vue"/>

## Opening with parameters

Pass data when calling `instance.show(data)`; receive it via `onShowableShow` or `useShowableInstance({ onShow })`.

<demo src="../examples/showable/with-params.vue"/>

## API

### Provider

| Method | Description |
| --- | --- |
| `useShowableContextProvider()` | Call once in the parent to provide showable context. Must be called before any child uses `useShowableInstance`. |

### useShowableInstance(options?)

Call inside a subtree that already has a provider. Returns the current showable instance API and reactive state.

**Returns:**

| Property / method | Type | Description |
| --- | --- | --- |
| `show(data?)` | `(data?: PARAMETERS) => void` | Open (sets visible true, status "none"); optional data is passed to listeners |
| `close(status?)` | `(status?: ShowableStatus) => void` | Close and set status (default "none") |
| `confirm()` | `() => void` | Close with status "ok" and emit "confirm" |
| `reject()` | `() => void` | Close with status "reject" and emit "reject" |
| `cancel()` | `() => void` | Close with status "cancel" and emit "cancel" |
| `visible` | `ComputedRef<boolean>` | Whether visible |
| `header` | `ComputedRef<string \| boolean>` | Header |
| `status` | `ComputedRef<ShowableStatus>` | Current status |

**Without a provider:** throws `"useShowableContextStore must be used after useShowableContextProvider"`.

### UseShowableInstanceOption

| Property | Type | Description |
| --- | --- | --- |
| `onShow` | `(parameters?: PARAMETERS) => void \| Promise<void>` | Called when `show()` is invoked; receives the passed parameters. When `REQUIRE` is `true`, parameters are required |
| `onHide` | `(status: ShowableStatus) => void` | Called when `close()` is invoked; receives the close status |
| `onConfirm` | `() => void` | Called when status becomes "ok" (via `confirm()`) |
| `onReject` | `() => void` | Called when status becomes "reject" (via `reject()`) |
| `onCancel` | `() => void` | Called when status becomes "cancel" (via `cancel()`) |
| `header` | `MaybeRefOrGetter<string \| false>` | Header synced to store; string, `false` (hide), or ref/computed |

### onShowableShow / onShowableHide

| Method | Description |
| --- | --- |
| `onShowableShow(fn, options?)` | Register a callback when `show()` is called; callback receives the arguments passed to `show()`. `options.immediate` (default `true`) controls whether it runs immediately if already visible. When the callback’s parameter type is required, `immediate` is not available (type-level). |
| `onShowableHide(fn)` | Register a callback when `close()` is called; callback receives the close status |

### showableRef()

Returns `shallowRef<Showable<T> | null>(null)` for holding a reference to the showable instance. After binding via template ref to a Dialog (or similar), call `dialogRef.value?.show()` from outside.

**Note:** The component bound by ref must call **`expose({ show })`** in setup so `show` is available on the ref.

### Types

| Type | Description |
| --- | --- |
| `ShowableStatus` | `"none" \| "ok" \| "cancel" \| "reject"` — status when closed |
| `ShowableInstance<PARAMETERS, REQUIRE?>` | Return type of `useShowableInstance` (includes `show/close/confirm/reject/cancel` and reactive state) |
| `Showable<PARAMETERS, REQUIRE?>` | Interface with only `show(data?)`; used by `showableRef`, etc. When `REQUIRE` is `true`, `show()` requires an argument |
| `ShowableResult<T>` | Result object shape (id, status, data, etc.; extend as needed) |
