# Hoci – Project Overview

**Hoci** is a headless component library for Vue 3. It provides unstyled, logic-only components and composables so you can plug in any design system or styling approach.

## What “headless” means

- Components ship **no default styles** (no CSS). You control layout, colors, and appearance via your own classes or CSS.
- Components focus on **behavior and state** (selection, visibility, focus, etc.) and expose that via props, events, and composables.
- Built for **Vue 3** (Composition API, `<script setup>`, TypeScript).

## Tech stack

- **Vue 3** – Composition API, `<script setup>`, JSX/TSX supported.
- **TypeScript** – Full typings, ESM, tree-shaking friendly.
- **Package** – Published as `hoci` on npm; install with `pnpm add hoci` (or npm/yarn).

## Main concepts

1. **Components** – e.g. `HiSelection`, `HiPopover`, `HiSwitch`, `HiIcon`, `HiTabs`, `HiVirtualList`, `HiAffix`, `HiFileUpload`. Use them as Vue components and style via `class`, `activeClass`, `unactiveClass`, etc. Each has its own doc page under the component docs.
2. **Composables** – Each component has a corresponding composable (or set of composables) that expose the same behavior without the default template. Use the composables when you need to drive the logic from your own template or script. The component doc for that feature lists the related composables
3. **Resolver** – `HociResolver()` from `hoci/resolver` for unplugin-vue-components so components can be used without manual import (optional).

## Docs structure

- `docs/guide/` – Getting started.
- `docs/component/` – One page per component (Props, Events, Slots, Ref methods).
- `docs/examples/` – Live demos (Vue files).

## Answering questions

- Component docs list **Props**, **Events**, **Slots**, and **Ref methods**. Use those sections for “how to use” and “what’s available.” Link to the relevant component doc (e.g. Showable, Popover) as needed.
