<script setup>
import ClayCard from './ClayCard.vue'
import { experience } from '../data'
</script>

<template>
  <section id="experience" class="section">
    <h2 class="section-title">Experience <span class="wiggle" aria-hidden="true">🛠️</span></h2>
    <div class="timeline reveal-stagger" v-reveal>
      <ClayCard v-for="job in experience" :key="job.org" staggered class="exp-card">
        <div class="exp-head">
          <span class="exp-icon">{{ job.icon }}</span>
          <div>
            <h3>{{ job.role }}</h3>
            <p class="exp-meta">{{ job.meta }}</p>
          </div>
          <span class="clay-pill date-pill">{{ job.dateRange }}</span>
        </div>
        <ul>
          <li v-for="(bullet, i) in job.bullets" :key="i" v-html="bullet"></li>
        </ul>
      </ClayCard>
    </div>
  </section>
</template>

<style scoped>
.timeline { display: flex; flex-direction: column; gap: 26px; }

.exp-head {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.exp-icon {
  font-size: 1.8rem;
  border: var(--border-w) solid var(--border);
  border-radius: var(--radius);
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.exp-card:nth-of-type(4n+1) .exp-icon { background: var(--chip-coral); }
.exp-card:nth-of-type(4n+2) .exp-icon { background: var(--chip-sky); }
.exp-card:nth-of-type(4n+3) .exp-icon { background: var(--chip-lavender); }
.exp-card:nth-of-type(4n+4) .exp-icon { background: var(--chip-mint); }

.exp-head h3 { margin-bottom: 2px; font-size: 1.2rem; }

.date-pill { margin-left: auto; }

.exp-card ul { margin: 0; padding-left: 20px; }
.exp-card li { margin-bottom: 8px; color: var(--ink); }

@media (max-width: 860px) {
  .exp-head { flex-direction: column; }
  .date-pill { margin-left: 0; }
}
</style>
