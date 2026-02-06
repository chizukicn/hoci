import type { MaybeRefOrGetter, Ref } from "vue";
import { createInjectionState, toReactive, tryOnScopeDispose } from "@vueuse/core";
import { mitt } from "tslx";
import { computed, ref, shallowRef, toValue, watchPostEffect } from "vue";

/**
 * Interface for a showable instance that can be opened with optional or required parameters.
 *
 * @template PARAMETERS - Type of parameters that can be passed to `show()`
 * @template REQUIRE - Whether parameters are required (true) or optional (false)
 *
 * When REQUIRE is true, `show()` requires a parameter.
 * When REQUIRE is false (default), `show()` parameter is optional.
 */
export type Showable<PARAMETERS = any, REQUIRE extends boolean = false> = (REQUIRE extends true ? {
  show: (data: PARAMETERS) => void;
} : {
  show: (data?: PARAMETERS) => void;
}) & {
  close: (status?: ShowableStatus) => void;
};

/**
 * Status of a showable instance when it's closed.
 * - `"none"`: Default state, no specific action taken
 * - `"ok"`: Confirmed/approved action
 * - `"cancel"`: Cancelled action
 * - `"reject"`: Rejected action
 */
export type ShowableStatus = "none" | "ok" | "cancel" | "reject";

/**
 * Infers whether the first parameter of a function is required (not optional).
 * Used to determine if `immediate` option should be allowed in `onShowableShow`.
 *
 * @internal
 */
type InferParamRequired<F> = F extends (p: infer P) => any
  ? undefined extends P
    ? false
    : true
  : false;

/**
 * Options for `onShowableShow` function.
 * When the callback's parameter is required, `immediate` option is not allowed
 * (to prevent calling the callback without parameters).
 *
 * @internal
 */
type OnShowableShowOption<F> = InferParamRequired<F> extends true
  ? Record<string, never>
  : { immediate?: boolean };

/**
 * Creates the injection state for showable context.
 * Provides reactive state (visible, header, status) and event emitter
 * that can be accessed by child components via `useShowableInstance`.
 *
 * The provider function returns a store with control methods (show, close, confirm, etc.)
 * and reactive state (visible, header, status).
 *
 * @returns Tuple of [provider function, store getter function]
 * @internal
 */
const [useShowableContextProvider, _useShowableContextStore] = createInjectionState(() => {
  const visible = ref(false);
  const header = ref<string | boolean>("");
  const status = ref<ShowableStatus>("none");
  const emitter = mitt<{
    show: [parameters: any];
    hide: [status: ShowableStatus];
    confirm: [];
    reject: [];
    cancel: [];
  }>();

  /**
   * Opens the showable instance with optional parameters.
   * Sets visible to true and status to "none", then emits "show" event.
   *
   * @param data - Optional parameters to pass to show event listeners
   */
  const show = (data?: any) => {
    visible.value = true;
    status.value = "none";
    emitter.emit("show", data);
  };

  /**
   * Closes the showable instance with a specific status.
   * Sets visible to false and updates status, then emits "hide" event.
   *
   * @param resultStatus - Result status to set when closing (default: "none")
   */
  const close = (resultStatus: ShowableStatus = "none") => {
    visible.value = false;
    status.value = resultStatus;
    emitter.emit("hide", resultStatus);
  };

  /**
   * Closes the showable instance with "ok" status.
   * Equivalent to `close("ok")` but also emits "confirm" event.
   */
  const confirm = () => {
    close("ok");
    emitter.emit("confirm");
  };

  /**
   * Closes the showable instance with "reject" status.
   * Equivalent to `close("reject")` but also emits "reject" event.
   */
  const reject = () => {
    close("reject");
    emitter.emit("reject");
  };

  /**
   * Closes the showable instance with "cancel" status.
   * Equivalent to `close("cancel")` but also emits "cancel" event.
   */
  const cancel = () => {
    close("cancel");
    emitter.emit("cancel");
  };

  return {
    visible,
    header,
    status,
    emitter,
    show,
    close,
    confirm,
    reject,
    cancel,
  };
});

/**
 * Internal function that wraps the raw store with lifecycle methods.
 * Adds event handlers (onShow, onHide, etc.) and control methods (show, close, confirm, etc.)
 * to the base store. This is used internally by `useShowableInstance` and other composables.
 *
 * @throws {Error} If called without a provider (useShowableContextProvider not called)
 * @returns Store with lifecycle methods and control functions
 * @internal
 */
function _useShowableContextStoreWithLifecycles() {
  const store = _useShowableContextStore();
  if (!store) {
    throw new Error("useShowableContextStore must be used after useShowableContextProvider");
  }
  const { visible, header, status, emitter, show, close, confirm, reject, cancel } = store;

  /**
   * Register a callback to be called when the showable becomes visible.
   * The callback receives the parameters passed to `show()`.
   *
   * @param fn - Callback function that receives parameters
   * @param options - Options object. If callback parameter is required, `immediate` is not allowed.
   */
  const onShow: <F extends (parameters?: any) => void | Promise<void>>(
    fn: F,
    options?: OnShowableShowOption<F>
  ) => void = (fn, options) => {
    emitter.on("show", fn);
    tryOnScopeDispose(() => {
      emitter.off("show", fn);
    });
    const immediate = options?.immediate ?? true;
    if (immediate) {
      (fn as (p?: any) => void)(undefined);
    }
  };

  /**
   * Register a callback to be called when the showable becomes hidden.
   * The callback receives the status that was set when closing.
   *
   * @param fn - Callback function that receives the status
   */
  const onHide = (fn: (status: ShowableStatus) => void | Promise<void>) => {
    emitter.on("hide", fn);
    tryOnScopeDispose(() => {
      emitter.off("hide", fn);
    });
  };

  /**
   * Register a callback to be called when the showable is confirmed (status becomes "ok").
   *
   * @param fn - Callback function
   */
  const onConfirm = (fn: () => void) => {
    emitter.on("confirm", fn);
    tryOnScopeDispose(() => {
      emitter.off("confirm", fn);
    });
  };

  /**
   * Register a callback to be called when the showable is rejected (status becomes "reject").
   *
   * @param fn - Callback function
   */
  const onReject = (fn: () => void) => {
    emitter.on("reject", fn);
    tryOnScopeDispose(() => {
      emitter.off("reject", fn);
    });
  };

  /**
   * Register a callback to be called when the showable is cancelled (status becomes "cancel").
   *
   * @param fn - Callback function
   */
  const onCancel = (fn: () => void) => {
    emitter.on("cancel", fn);
    tryOnScopeDispose(() => {
      emitter.off("cancel", fn);
    });
  };

  return toReactive({
    visible,
    header,
    status,
    onShow,
    onHide,
    onConfirm,
    onReject,
    onCancel,
    show,
    close,
    confirm,
    reject,
    cancel,
  });
}

/**
 * Result object that can be returned from a showable instance.
 * Typically used for dialogs or modals that need to return a result.
 *
 * @template T - Type of the data payload
 */
export interface ShowableResult<T = any> {
  /** Unique identifier for this result */
  id: string | number | symbol;
  /** Status indicating how the showable was closed */
  status: ShowableStatus;
  /** Optional data payload */
  data?: T;
  /** Whether the status is "ok" */
  readonly isOk: boolean;
  /** Whether the status is "cancel" */
  readonly isCancel: boolean;
  /** Whether the status is "reject" */
  readonly isReject: boolean;
}

/**
 * Options for `useShowableInstance` composable.
 *
 * @template PARAMETERS - Type of parameters that can be passed to `show()`
 * @template REQUIRE - Whether parameters are required (true) or optional (false)
 */
export interface UseShowableInstanceOption {
  /** Callback called when the showable becomes visible. Receives parameters passed to `show()`. */
  onShow?: (data?: any) => Promise<void> | void;
  /** Callback called when the showable becomes hidden. Receives the status set when closing. */
  onHide?: (status: ShowableResult["status"]) => void;
  /** Callback called when status becomes "ok" (via `confirm()`). */
  onConfirm?: () => void;
  /** Callback called when status becomes "reject" (via `reject()`). */
  onReject?: () => void;
  /** Callback called when status becomes "cancel" (via `cancel()`). */
  onCancel?: () => void;
  /** Header text to display. Can be a string, false to hide, or a ref/computed. */
  header?: MaybeRefOrGetter<string | false>;
}

/**
 * Register a callback to be called when the showable becomes visible.
 * This is a standalone composable that can be used independently of `useShowableInstance`.
 *
 * The callback will receive the parameters that were passed to `show()`.
 * If `immediate` is true (default), the callback will be called immediately if the showable is already visible.
 *
 * @param fn - Callback function that receives the parameters
 * @param options - Options object. When callback parameter is required, `immediate` option is not allowed.
 *
 * @example
 * ```ts
 * onShowableShow((params) => {
 *   console.log('Showable opened with:', params);
 * });
 * ```
 */
export function onShowableShow<F extends (parameters?: any) => void | Promise<void>>(
  fn: F,
  options?: OnShowableShowOption<F>
) {
  const store = _useShowableContextStoreWithLifecycles();
  store?.onShow(fn, options);
}

/**
 * Register a callback to be called when the showable becomes hidden.
 * This is a standalone composable that can be used independently of `useShowableInstance`.
 *
 * The callback will receive the status that was set when closing (e.g., "ok", "cancel", "reject").
 *
 * @param fn - Callback function that receives the status
 *
 * @example
 * ```ts
 * onShowableHide((status) => {
 *   console.log('Showable closed with status:', status);
 * });
 * ```
 */
export function onShowableHide(fn: (status: ShowableStatus) => void | Promise<void>) {
  const store = _useShowableContextStoreWithLifecycles();
  store?.onHide(fn);
}

/**
 * Instance returned by `useShowableInstance`.
 * Provides control methods and reactive state for a showable component.
 *
 * This instance can be returned from a component's setup function to be mounted
 * to a `showableRef` via Vue's ref binding mechanism.
 *
 * @template PARAMETERS - Type of parameters that can be passed to `show()`
 * @template REQUIRE - Whether parameters are required (true) or optional (false)
 */
export type ShowableInstance<PARAMETERS = any, REQUIRE extends boolean = false> = Showable<PARAMETERS, REQUIRE> & {
  /** Close the showable with an optional status */
  close: (status?: ShowableStatus) => void;
  /** Close the showable with "ok" status */
  confirm: () => void;
  /** Close the showable with "reject" status */
  reject: () => void;
  /** Close the showable with "cancel" status */
  cancel: () => void;
  /** Reactive computed ref indicating whether the showable is visible */
  visible: Ref<boolean>;
  /** Reactive computed ref for the header text */
  header: Ref<string | boolean>;
  /** Reactive computed ref for the current status */
  status: Ref<ShowableStatus>;
};

/**
 * Main composable for managing a showable instance (e.g., dialog, drawer, modal).
 * Must be used within a component tree that has called `useShowableContextProvider`.
 *
 * This composable provides:
 * - Control methods: `show()`, `close()`, `confirm()`, `reject()`, `cancel()`
 * - Reactive state: `visible`, `header`, `status`
 * - Lifecycle callbacks via options: `onShow`, `onHide`, `onConfirm`, `onReject`, `onCancel`
 *
 * The returned instance can be returned from a component's setup function
 * to be mounted to a `showableRef` via Vue's ref binding mechanism.
 *
 * @param options - Configuration options for the showable instance
 * @returns Instance with control methods and reactive state
 * @throws {Error} If called without a provider (useShowableContextProvider not called)
 *
 * @example
 * ```ts
 * // In Dialog Wrapper component
 * const Dialog = {
 *   setup() {
 *     useShowableContextProvider();
 *     return () => h(DialogContent);
 *   }
 * };
 *
 * // In Content component
 * const DialogContent = {
 *   setup() {
 *     const instance = useShowableInstance({
 *       header: 'My Dialog',
 *       onShow: (params) => console.log('Opened:', params),
 *       onConfirm: () => console.log('Confirmed')
 *     });
 *
 *     // Return instance to mount to showableRef
 *     return instance;
 *   }
 * };
 *
 * // External usage
 * const dialogRef = showableRef();
 * // <Dialog ref={dialogRef} />
 * dialogRef.value?.show({ id: 1 });
 * ```
 */
export function useShowableInstance(options: UseShowableInstanceOption = {}): ShowableInstance {
  const store = _useShowableContextStoreWithLifecycles();

  // Sync header option to store
  watchPostEffect(() => {
    store.header = toValue(options.header ?? false);
  });

  // Register lifecycle callbacks if provided
  if (options.onShow) {
    store.onShow(options.onShow);
  }

  if (options.onHide) {
    store.onHide(options.onHide);
  }
  if (options.onConfirm) {
    store.onConfirm(options.onConfirm);
  }
  if (options.onReject) {
    store.onReject(options.onReject);
  }
  if (options.onCancel) {
    store.onCancel(options.onCancel);
  }

  return {
    header: computed(() => store.header),
    status: computed(() => store.status),
    visible: computed(() => store.visible),
    show: store.show,
    close: store.close,
    confirm: store.confirm,
    reject: store.reject,
    cancel: store.cancel
  };
}

/**
 * Creates a shallow ref that can hold a reference to a showable instance.
 * Used for template refs to mount showable instances to components via Vue's ref binding.
 *
 * The ref should be bound to a component that returns a showable instance
 * (e.g., via `useShowableInstance()` or `useShowableContextProvider()`).
 *
 * @template T - Type of parameters for the showable
 * @returns A shallow ref initialized to null
 *
 * @example
 * ```ts
 * // Create ref
 * const dialogRef = showableRef<{ id: number }>();
 *
 * // Bind to component via template ref
 * // <Dialog ref={dialogRef} />
 *
 * // Use it from external scope
 * dialogRef.value?.show({ id: 1 });
 * ```
 */
export function showableRef<T>() {
  return shallowRef<Showable<T> | null>(null);
}

/**
 * Provides the showable context to child components.
 * Must be called in a parent component before child components can use `useShowableInstance`.
 *
 * Returns a store with control methods (show, close, confirm, reject, cancel)
 * and reactive state (visible, header, status) that can be used to control
 * the showable instance from the provider component.
 *
 * @returns Store with control methods and reactive state
 *
 * @example
 * ```ts
 * // In parent component (Dialog Wrapper)
 * const Dialog = {
 *   setup() {
 *     const { visible, cancel } = useShowableContextProvider();
 *     // Use visible to control Teleport display
 *     // Use cancel for backdrop click handler
 *     return () => h(DialogContent);
 *   }
 * };
 * ```
 */
export { useShowableContextProvider };
