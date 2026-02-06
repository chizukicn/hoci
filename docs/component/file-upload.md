# File Upload

## Basic usage
<demo src="../examples/file-upload/basic.vue"/>

## Multiple files
<demo src="../examples/file-upload/multiple.vue"/>

## File type restriction
<demo src="../examples/file-upload/accept.vue"/>

## FileUpload Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `File \| File[]` | `[]` | Selected file(s); use with v-model |
| multiple | `boolean` | `false` | Allow multiple files |
| accept | `string` | `'*/*'` | Accepted types, e.g. `.jpg,.png` |
| as | `string` | `'div'` | Wrapper tag name |

## FileUpload Events

| Name | Payload | Description |
| --- | --- | --- |
| update:modelValue | `(value: File \| File[])` | Emitted when selection changes |
| change | `(value: File \| File[])` | Emitted when selection changes |

## FileUpload Slots

| Name | Payload | Description |
| --- | --- | --- |
| default | `{ files: File[] }` | Custom upload area; receives current file list |
