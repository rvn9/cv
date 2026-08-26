<script setup>
import ClayCard from './ClayCard.vue'
import { achievements } from '../data'
</script>

<template>
  <section id="achievements" class="section">
    <h2 class="section-title">Honors &amp; achievements <span class="wiggle" aria-hidden="true">✨</span></h2>
    <div class="achieve-grid reveal-stagger" v-reveal>
      <ClayCard v-for="item in achievements" :key="item.title" staggered class="achieve-card">
        <span class="achieve-emoji">{{ item.emoji }}</span>
        <h3>{{ item.title }}</h3>
        <p v-if="item.meta" class="exp-meta">{{ item.meta }}</p>
        <div v-html="item.body"></div>
      </ClayCard>
    </div>
  </section>
</template>

<style scoped>
.achieve-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.achieve-emoji {
  font-size: 1.7rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border: var(--border-w) solid var(--border);
  border-radius: var(--radius);
  margin-bottom: 14px;
}
.achieve-card:nth-of-type(3n+1) .achieve-emoji { background: var(--chip-coral); }
.achieve-card:nth-of-type(3n+2) .achieve-emoji { background: var(--chip-sky); }
.achieve-card:nth-of-type(3n+3) .achieve-emoji { background: var(--chip-lavender); }
.achieve-card h3 { font-size: 1.1rem; }

@media (max-width: 860px) {
  .achieve-grid { grid-template-columns: 1fr; }
}
</style>
