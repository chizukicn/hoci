# Switch (开关)

Switch 组件用于在两种状态间切换，支持自定义激活事件、样式和禁用等功能。

## Basic Usage (基本使用)
通过 `v-model` 绑定开关状态，通过 `activeClass` 和 `unactiveClass` 自定义激活与未激活状态的样式。
<demo src="../examples/switch/basic.vue"/>

## Disabled (禁用状态)
通过 `disabled` 属性设置禁用状态，通过 `disabledClass` 自定义禁用状态的样式。
<demo src="../examples/switch/disabled.vue"/>

## Activate Event (激活事件)
通过 `activateEvent` 属性设置激活事件，支持 `click`、`mouseenter`、`mousedown`、`mouseup`、`dblclick`、`contextmenu`、`touchstart`、`touchend` 事件。
<demo src="../examples/switch/event.vue"/>

## Switch Props (参数)
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | 当前开关状态，支持 v-model 绑定 |
| class | `ClassType` | - | 组件根元素的类名 |
| activeClass | `ClassType` | - | 激活（打开）状态时的类名 |
| unactiveClass | `ClassType` | - | 未激活（关闭）状态时的类名 |
| activateEvent | `'click' \| 'mouseenter' \| 'mousedown' \| 'mouseup' \| 'dblclick' \| 'contextmenu' \| 'touchstart' \| 'touchend'` | `'click'` | 触发切换的事件类型 |
| disabled | `boolean` | `false` | 是否禁用 |
| disabledClass | `ClassType` | - | 禁用状态时的类名 |
| as | `string` | `'div'` | 渲染的 HTML 标签名 |

## Switch Events (事件)
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `(value: boolean)` | 状态变化时触发，支持 v-model |
| change | `(value: boolean)` | 状态变化时触发 |
| reject | `(value: any)` | 禁用状态下尝试切换时触发 |

## Switch Slots (插槽)
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | `{ active: boolean, isDisabled: boolean }` | 自定义内容，参数为当前激活和禁用状态 |
