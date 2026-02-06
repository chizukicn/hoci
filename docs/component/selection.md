# Selection

## Basic usage
<demo src="../examples/selection/basic.vue"/>

## Slots
<demo src="../examples/selection/slots.vue"/>

## Selection Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| model-value | `any` | `undefined` | Bound value |
| active-event | `ActiveEvent` | `click` | Event that triggers selection |
| item-class | `ClassType` | "" | Class for items |
| active-class | `ClassType` | "" | Class for selected item |
| unactive-class | `ClassType` | "" | Class for unselected item |
| disabled-class | `ClassType` | "" | Class for disabled item |
| multiple | `boolean` | `false` | Whether multiple selection is allowed |
| clearable | `boolean` | `false` | Whether selection can be cleared |

## Selection Events

| Name | Description |
| --- | --- |
| update:model-value | Emitted when bound value changes |
| change | Emitted when selection changes |

## Item Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| value | `any` | `undefined` | Value for this item |
| active-event | `ActiveEvent` | `click` | Event that triggers selection |
| disabled | `boolean` | `false` | Whether disabled |
