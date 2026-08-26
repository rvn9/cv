<script setup>
// Hover/press ("lift" transform + shadow growth) live entirely in style.css's .btn:hover/:active
// rules so both animate on the same CSS transition instead of drifting out of sync.
defineProps({
  href: { type: String, default: null },
  download: { type: Boolean, default: null },
  target: { type: String, default: null },
  rel: { type: String, default: null },
})
</script>

<template>
  <a
    v-if="href"
    class="btn btn-clay"
    :href="href"
    :download="download"
    :target="target"
    :rel="rel"
  >
    <slot />
  </a>
  <button v-else class="btn btn-clay" v-bind="$attrs">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 14px 26px;
  border: var(--border-w) solid var(--border);
  border-radius: var(--radius);
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: var(--shadow-x) var(--shadow-y) 0 var(--shadow);
  transition: box-shadow 0.15s ease-out, transform 0.15s ease-out;
}
.btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: calc(var(--shadow-x) + 3px) calc(var(--shadow-y) + 3px) 0 var(--shadow);
}
.btn:active {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0 var(--shadow);
}

.btn-clay {
  background: var(--surface);
  color: var(--page-ink);
}

.btn-primary {
  background: var(--accent-strong);
  color: #fff;
}

.btn-small { padding: 10px 18px; font-size: 0.85rem; }
</style>
