<script setup>
import ClayCard from './ClayCard.vue'
import ClayButton from './ClayButton.vue'
</script>

<template>
  <section id="testimonial" class="section">
    <h2 class="section-title">What people say <span class="wiggle" aria-hidden="true">💬</span></h2>
    <ClayCard class="testimonial-card">
      <span class="quote-mark">&ldquo;</span>
      <p class="quote-text">
        Andreas played a pivotal role in our major crypto exchange app revamp. He took full ownership
        of the "Earn" product stream, leading mobile execution for our staking features — a complex
        domain requiring high precision and seamless user flows. What truly sets Andreas apart is his
        delivery speed and composure under pressure: he consistently thrives in high‑pressure
        environments, delivering feature‑complete work rapidly and reliably on time.
      </p>
      <div class="quote-author">
        <div class="author-avatar">TM</div>
        <div>
          <strong>Tan Meng Hui</strong>
          <p class="exp-meta">Frontend Engineering Manager, Hata Technologies Sdn Bhd</p>
        </div>
        <ClayButton
          class="btn-small"
          href="/assets/Andreas-Agustinus-Recommendation-Letter.pdf"
          target="_blank"
          rel="noopener"
        >
          Read full letter ↗<span class="visually-hidden"> (opens in new tab)</span>
        </ClayButton>
      </div>
    </ClayCard>
  </section>
</template>

<style scoped>
.quote-mark {
  font-family: 'Fredoka', sans-serif;
  font-size: 5rem;
  color: var(--quote-mark);
  position: absolute;
  top: 10px;
  left: 24px;
  line-height: 1;
}
.quote-text {
  font-size: 1.15rem;
  color: var(--ink);
  font-weight: 500;
  position: relative;
  z-index: 1;
}
.quote-author {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 20px;
  flex-wrap: wrap;
}
.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
  background: var(--bg);
  border: var(--border-w) solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-family: 'Fredoka', sans-serif;
  color: var(--accent-2-text);
  box-shadow: 3px 3px 0 var(--shadow);
}
.quote-author strong { display: block; }
/* :deep() — the "Read full letter" button is ClayButton's own root element, rendered from
   ClayButton.vue's template rather than this one, so a plain scoped `.btn` selector wouldn't
   match it. */
.quote-author :deep(.btn) { margin-left: auto; }
</style>
