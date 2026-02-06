# Icon

Icon renders SVG and image icons with configurable size, color, and more.

:::tip
This component was inspired by [Anthony Fu](https://github.com/antfu)'s post [Icons in Pure CSS](https://antfu.me/posts/icons-in-pure-css). Thanks to Anthony Fu for sharing.
:::

## Basic usage
<demo src="../examples/icon/basic.vue"/>

## Size

You can set size in several ways:

1. **`size` prop** (sets both width and height):
   - Number (px): `:size="16"`
   - String with unit: `size="2rem"`, `size="16px"`
2. **`width` and `height`** props
3. **CSS `width` and `height`** (recommended)

<demo src="../examples/icon/size.vue"/>

## Color

Two options:

1. **`color` prop**
2. **CSS `color`** (recommended) — works with theme variables and pseudo-classes like `:hover` for transitions

<demo src="../examples/icon/color.vue"/>

## Render mode

- **mask**: For SVG icons that should inherit color (e.g. from `color` or CSS `color`)
- **background**: For regular image icons

<demo src="../examples/icon/mask.vue"/>

## Global config

Use `HiConfigProvider` to set default icon options:

```vue
<template>
  <hi-config-provider :icon="{ size: 24, sizeUnit: 'px' }">
    <hi-icon src="/hoci.svg" />
  </hi-config-provider>
</template>
```

## Icon Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | - | Icon source (SVG or image URL) |
| size | `number \| string` | - | Size (width and height) |
| width | `number \| string` | - | Width |
| height | `number \| string` | - | Height |
| color | `string` | `currentColor` | Color (mask mode only) |
| mask | `boolean \| "auto"` | `"auto"` | Render mode |
| as | `string` | `"div"` | Root HTML tag |

## ConfigProvider Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| size | `number` | - | Default icon size |
| sizeUnit | `string` | `"px"` | Size unit |
