<script setup>
// staggered=true: this card sits inside a container that already carries the .reveal-stagger
// scroll-reveal — it just needs to be a plain child, staggered by the parent's nth-child delays.
// staggered=false: no such parent, so the card drives its own scroll-reveal via v-reveal.
// Hover/press ("lift" transform + shadow growth) live entirely in style.css's .clay:hover/:active
// rules so both animate on the same CSS transition instead of drifting out of sync.
const props = defineProps({
  staggered: { type: Boolean, default: false },
})
</script>

<template>
  <div class="clay card" :class="{ reveal: !props.staggered }" v-reveal="!props.staggered">
    <slot />
  </div>
</template>

<style scoped>
/* Card base: bordered block + hard offset shadow (no blur). Transform and box-shadow are
   driven by the same CSS transition so the "lift" reads as one motion instead of two systems
   (a JS-animated transform + a CSS-animated shadow) drifting out of sync with each other. */
.clay {
  background: var(--surface);
  border: var(--border-w) solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-x) var(--shadow-y) 0 var(--shadow);
  transition: box-shadow 0.15s ease-out, transform 0.15s ease-out;
}

.clay:hover {
  transform: translate(-2px, -2px);
  box-shadow: calc(var(--shadow-x) + 3px) calc(var(--shadow-y) + 3px) 0 var(--shadow);
}

.card { padding: 32px; }
</style>
