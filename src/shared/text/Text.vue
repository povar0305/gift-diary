<script lang="ts" setup>
import type { TextProps } from "./types";

withDefaults(
    defineProps<TextProps>(),
    {
      text: '',
      align: 'start',
    }
)
</script>

<template>
  <span
    :class="[
      'text text-on-background',
      `text-${align}` ]"
  >
    <slot>
      {{ text }}
    </slot>
  </span>
</template>

<style scoped>
.text {
  width: 100%;
  max-width: 65ch;
  font-size: clamp(1rem, 2vw, 1.125rem);
  font-family: inherit;
  font-weight: 400;
  line-height: 1.6;
  margin: 0;
}
</style>