<script setup>
import ClayCard from './ClayCard.vue'
import { skillGroups } from '../data'
</script>

<template>
  <section id="skills" class="section">
    <h2 class="section-title">Tech Stack &amp; Tools <span class="wiggle" aria-hidden="true">🧰</span></h2>
    <div class="skills-grid reveal-stagger" v-reveal>
      <ClayCard v-for="group in skillGroups" :key="group.title" staggered class="skill-card">
        <h3>{{ group.title }}</h3>
        <div class="chip-row">
          <span v-for="chip in group.chips" :key="chip" class="chip">{{ chip }}</span>
        </div>
      </ClayCard>
    </div>
  </section>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.skill-card h3 { margin-bottom: 14px; }

@media (max-width: 860px) {
  .skills-grid { grid-template-columns: 1fr; }
}
</style>
