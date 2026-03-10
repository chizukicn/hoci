# 标签页 (Tabs)

> 💡 Tabs组件是基于[Selection](/zh/component/selection)组件实现的，因此大部分参数都继承自Selection组件

Tabs组件用于在同一容器内切换不同的内容区域。

## 基本用法
通过使用`HiTabs`组件，可以实现一个标签页，并使用`HiTabPane`或是`HiItem`组件来定义每个标签页的内容。
<demo src="../../examples/tabs/basic.vue"/>

## Tabs Props (参数)

**继承自 Selection 的通用参数：**

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| model-value | `any` | `undefined` | 当前激活的标签页值，支持v-model |
| active-event | `ActiveEvent` | `click` | 触发选中的事件 |
| item-class | `ClassType` | - | 标签项的类名 |
| active-class | `ClassType` | - | 激活标签项的类名 |
| unactive-class | `ClassType` | - | 未激活标签项的类名 |
| disabled-class | `ClassType` | - | 禁用标签项的类名 |
| multiple | `boolean` | `false` | 是否多选 |
| clearable | `boolean` | `false` | 是否可以不选择任何标签 |

**Tabs 增加参数：**

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| header-class | `ClassType` | - | 标签头部的自定义类名 |
| as | `string` | `div` | 外层容器标签名 |
| header-as | `string` | `div` | 头部容器标签名 |
| content-as | `string` | `div` | 内容容器标签名 |
| content-class | `ClassType` | - | 内容区域的自定义类名 |
| keep-alive | `boolean \| KeepAliveProps` | `false` | 是否缓存内容区域 |

## Tabs Events (事件)
| 名称 | 说明 |
| --- | --- |
| update:model-value | 激活标签变化时触发 |
| change | 激活标签变化时触发 |

## Tabs Slots (插槽)
| 名称 | 说明 |
| --- | --- |
| default | 用于自定义标签头内容 |
| content | 用于自定义内容区域，参数为`{ component }` |

---

## 标签页面板 (TabPane)

TabPane用于定义每个标签页的内容。

### TabPane Props (参数)
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | `any` | `undefined` | 标签页的唯一值 |
| label | `string` | - | 标签页显示的文本 |
| active-event | `ActiveEvent` | `click` | 触发选中的事件 |
| disabled | `boolean` | `false` | 是否禁用 |

### TabPane Slots (插槽)
| 名称 | 说明 |
| --- | --- |
| default | 标签页内容 |
