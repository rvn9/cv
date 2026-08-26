<script setup>
// One-time intro shown before the hero on a fresh session — skipped entirely (no flash, no
// DOM) if the user has already seen it this session or prefers reduced motion. Click/tap/Esc
// dismisses it early since it's decorative, never load-blocking.
import { ref, onMounted, onBeforeUnmount } from 'vue'

const show = ref(false)
const active = ref(false)
const leaving = ref(false)
const timers = []

function finish() {
  leaving.value = true
  timers.push(setTimeout(() => {
    show.value = false
    document.body.style.overflow = ''
  }, 320))
}

function skip() {
  if (leaving.value || !show.value) return
  timers.forEach(clearTimeout)
  timers.length = 0
  finish()
}

onMounted(() => {
  const alreadySeen = sessionStorage.getItem('splash-shown')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (alreadySeen || reduceMotion) return

  sessionStorage.setItem('splash-shown', '1')
  show.value = true
  document.body.style.overflow = 'hidden'

  requestAnimationFrame(() => { active.value = true })
  timers.push(setTimeout(finish, 900))
})

onBeforeUnmount(() => {
  timers.forEach(clearTimeout)
  document.body.style.overflow = ''
})
</script>

<template>
  <div
    v-if="show"
    class="splash"
    :class="{ 'splash-active': active, 'splash-leaving': leaving }"
    role="presentation"
    @click="skip"
    @keydown.esc="skip"
  >
    <div class="splash-mark">
      <span class="splash-logo">RVNG<span>.</span></span>
      <svg class="splash-underline" viewBox="0 0 120 12" aria-hidden="true">
        <path d="M4 7 Q 30 2, 60 7 T 116 6" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.splash {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  cursor: pointer;
  transition: opacity 0.32s ease, transform 0.32s ease;
}

.splash-leaving {
  opacity: 0;
  transform: scale(1.04);
  pointer-events: none;
}

.splash-mark {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  opacity: 0;
  transform: scale(0.82) translateY(6px);
  transition: opacity 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
    transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.splash-active .splash-mark {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.splash-logo {
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 2.6rem;
  color: var(--ink);
  letter-spacing: 0.02em;
}

.splash-logo span { color: var(--accent-2-text); }

.splash-underline {
  width: 90px;
  height: 10px;
  overflow: visible;
}

.splash-underline path {
  fill: none;
  stroke: var(--accent);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 140;
  stroke-dashoffset: 140;
  transition: stroke-dashoffset 0.5s ease-out 0.2s;
}

.splash-active .splash-underline path { stroke-dashoffset: 0; }

@media (prefers-reduced-motion: reduce) {
  .splash, .splash-mark, .splash-underline path { transition: none !important; }
}
</style>
