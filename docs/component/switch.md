# Switch

Switch toggles between two states. Supports custom activate event, styles, and disabled state.

## Basic usage

Bind state with `v-model`; use `activeClass` and `unactiveClass` for active/inactive styles.

<demo src="../examples/switch/basic.vue"/>

## Disabled

Use the `disabled` prop and `disabledClass` for disabled styling.

<demo src="../examples/switch/disabled.vue"/>

## Activate event

Use `activateEvent` to choose the event that toggles the switch: `click`, `mouseenter`, `mousedown`, `mouseup`, `dblclick`, `contextmenu`, `touchstart`, `touchend`.

<demo src="../examples/switch/event.vue"/>

## Switch Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | Current state; use with v-model |
| class | `ClassType` | - | Root element class |
| activeClass | `ClassType` | - | Class when on |
| unactiveClass | `ClassType` | - | Class when off |
| activateEvent | `'click' \| 'mouseenter' \| 'mousedown' \| 'mouseup' \| 'dblclick' \| 'contextmenu' \| 'touchstart' \| 'touchend'` | `'click'` | Event that toggles |
| disabled | `boolean` | `false` | Whether disabled |
| disabledClass | `ClassType` | - | Class when disabled |
| as | `string` | `'div'` | Root HTML tag |

## Switch Events

| Name | Payload | Description |
| --- | --- | --- |
| update:modelValue | `(value: boolean)` | Emitted when state changes (v-model) |
| change | `(value: boolean)` | Emitted when state changes |
| reject | `(value: any)` | Emitted when user tries to toggle while disabled |

## Switch Slots

| Name | Payload | Description |
| --- | --- | --- |
| default | `{ active: boolean, isDisabled: boolean }` | Custom content; receives current active and disabled state |
