# VirtualList（虚拟列表）

VirtualList 组件基于 TanStack Virtual 实现高性能虚拟滚动列表，适用于大数据量场景，支持自定义每一项的渲染。

## 基本用法

<demo src="../examples/virtual-list/basic.vue"/>

## Props(属性)

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| count | `number` | `0` | 列表总项数 |
| estimate-size | `number \| (index:number)=>number` | `50` | 预估每项高度/宽度（支持函数） |
| horizontal | `boolean` | `false` | 是否为横向滚动 |
| options | `object` | `{}` | 传递给虚拟化的其他参数 |

## Slots(插槽)

| 名称 | 说明 |
| --- | --- |
| item | 渲染每一项，参数为 `{ index, style }` |

## Events(事件)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| scrollEnd | 滚动到末尾时触发 | 无 |
| scrollStart | 滚动到开头时触发 | 无 |
| scroll | 滚动时触发 | 当前可见项的索引数组 |
