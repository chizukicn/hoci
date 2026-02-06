# Tabs

> Tabs is built on [Selection](./selection.md), so most props are inherited from Selection.

Tabs switch between different content panels in one container.

## Basic usage

Use `HiTabs` with `HiTabPane` or `HiItem` to define each tab and its content.

<demo src="../examples/tabs/basic.vue"/>

## Tabs Props

**From Selection:**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| model-value | `any` | `undefined` | Active tab value; use with v-model |
| active-event | `ActiveEvent` | `click` | Event that activates a tab |
| item-class | `ClassType` | - | Class for tab items |
| active-class | `ClassType` | - | Class for active tab |
| unactive-class | `ClassType` | - | Class for inactive tab |
| disabled-class | `ClassType` | - | Class for disabled tab |
| multiple | `boolean` | `false` | Allow multiple active tabs |
| clearable | `boolean` | `false` | Allow no active tab |

**Tabs-specific:**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| header-class | `ClassType` | - | Class for tab header |
| as | `string` | `div` | Root container tag |
| header-as | `string` | `div` | Header container tag |
| content-as | `string` | `div` | Content container tag |
| content-class | `ClassType` | - | Class for content area |
| keep-alive | `boolean \| KeepAliveProps` | `false` | Whether to keep inactive content mounted |

## Tabs Events

| Name | Description |
| --- | --- |
| update:model-value | Emitted when active tab changes |
| change | Emitted when active tab changes |

## Tabs Slots

| Name | Description |
| --- | --- |
| default | Tab header content |
| content | Content area; slot props: `{ component }` |

---

# TabPane

TabPane defines each tab’s value and content.

## TabPane Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| value | `any` | `undefined` | Tab value |
| label | `string` | - | Tab label text |
| active-event | `ActiveEvent` | `click` | Event that activates this tab |
| disabled | `boolean` | `false` | Whether disabled |

## TabPane Slots

| Name | Description |
| --- | --- |
| default | Tab panel content |
