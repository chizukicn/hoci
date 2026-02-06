# 文件上传 (File Upload)

## Basic Usage (基本使用)
<demo src="../../examples/file-upload/basic.vue"/>

## Multiple Upload (多文件上传)
<demo src="../../examples/file-upload/multiple.vue"/>

## File Type Restriction (文件类型限制)
<demo src="../../examples/file-upload/accept.vue"/>

## FileUpload Props (参数)
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | `File \| File[]` | `[]` | 已选择的文件，支持 v-model 绑定 |
| multiple | `boolean` | `false` | 是否支持多文件上传 |
| accept | `string` | `'*/*'` | 接受的文件类型，例如 '.jpg,.png' |
| as | `string` | `'div'` | 包装元素的标签名 |

## FileUpload Events (事件)
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `(value: File \| File[])` | 文件选择更新时触发 |
| change | `(value: File \| File[])` | 文件选择变化时触发 |

## FileUpload Slots (插槽)
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | `{ files: File[] }` | 自定义上传区域的内容，files 参数包含当前已选择的文件列表 |
