<script setup>
import ClayCard from './ClayCard.vue'
import { languages } from '../data'
</script>

<template>
  <section id="about" class="section">
    <h2 class="section-title">About me <span class="wiggle" aria-hidden="true">🍡</span></h2>
    <div class="about-grid reveal-stagger" v-reveal>
      <ClayCard staggered>
        <p>
          Senior Flutter Engineer with <strong>4+ years</strong> of experience building high‑performance,
          secure mobile applications. I maintain a <strong>99.6% crash‑free rate</strong> for apps with
          <strong>100,000+ downloads</strong>, ensuring technical excellence meets real‑world reliability.
        </p>
        <p>
          Through leading my own startup challenge, <strong>Dongkrak</strong>, I developed a deep
          understanding of market‑fit, rapid prototyping, and scaling an MVP under pressure. I'm a
          proactive collaborator who works closely with UI/UX teams to research user needs and run
          technical feasibility studies.
        </p>
        <div class="chip-row">
          <span class="chip">CEH Certified · 91.2/100</span>
          <span class="chip">TOEIC · 870/990</span>
          <span class="chip">BSc Computer Science · GPA 3.61</span>
        </div>
      </ClayCard>

      <ClayCard staggered class="lang-card">
        <h3>Languages 🗣️</h3>
        <div v-for="lang in languages" :key="lang.name" class="lang-row">
          <span>{{ lang.name }}</span>
          <span class="clay-pill">{{ lang.level }}</span>
        </div>
      </ClayCard>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.lang-card h3 { margin-bottom: 18px; }
.lang-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px dashed var(--dash-border);
  font-weight: 500;
}
.lang-row:last-child { border-bottom: none; }

@media (max-width: 860px) {
  .about-grid { grid-template-columns: 1fr; }
}
</style>
