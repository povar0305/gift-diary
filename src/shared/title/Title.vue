<script lang="ts" setup>
import type { TitleProps } from "./types";

withDefaults(
    defineProps<TitleProps>(),
    {
      text: '',
      align: 'start',
    }
)
</script>

<template>
  <h1
    :class="[
      `text-${align}`,
    ]"
    class="title-h1 text-on-background"
  >
    <slot>
      {{ text }}
    </slot>
  </h1>
</template>

<style scoped>
.title-h1 {
  width: stretch;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-family: inherit;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0;
}
</style>