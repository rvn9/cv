<script setup>
import ClayCard from './ClayCard.vue'
import { stats } from '../data'
</script>

<template>
  <section class="stats reveal-stagger" v-reveal>
    <ClayCard v-for="stat in stats" :key="stat.label" staggered class="stat-card">
      <span class="stat-num">{{ stat.num }}</span>
      <span class="stat-label">{{ stat.label }}</span>
    </ClayCard>
  </section>
</template>

<style scoped>
.stats {
  max-width: 1100px;
  margin: 0 auto;
  padding: 10px 24px 50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-num {
  font-family: 'Fredoka', sans-serif;
  font-size: 1.9rem;
  font-weight: 700;
  color: var(--accent-2-text);
}

.stat-label { font-weight: 500; font-size: 0.9rem; color: var(--ink-soft); }

@media (max-width: 860px) {
  .stats { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .stats { grid-template-columns: 1fr 1fr; }
}
</style>
