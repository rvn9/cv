<script setup>
import ClayButton from './ClayButton.vue'
</script>

<template>
  <header id="top" class="hero">
    <div class="hero-text reveal-stagger" v-reveal>
      <p class="eyebrow">👋 Hi there, I'm</p>
      <h1>Andreas Agustinus</h1>
      <p class="role">
        Senior Flutter Engineer &mdash; turning ambitious product ideas into
        <span class="highlight">secure, high‑performance</span> mobile apps.
      </p>
      <p class="lede">
        I bridge Engineering, Design &amp; Product. My approach is <strong>"Product‑First"</strong> — I
        don't just ship code, I help shape the user journey so features solve real pain points.
      </p>
      <div class="hero-cta">
        <ClayButton class="btn-primary" href="#contact" >Let's talk 🚀</ClayButton>
        <ClayButton href="/assets/Andreas-Agustinus-CV.pdf" download>Download CV 📄</ClayButton>
      </div>
    </div>

    <div class="hero-art reveal" v-reveal>
      <div class="hero-blob hero-blob-1" aria-hidden="true"></div>
      <div class="hero-blob hero-blob-2" aria-hidden="true"></div>
      <div class="avatar-circle" aria-hidden="true">
        <img class="avatar-photo" src="/assets/profile-photo.jpg" alt="" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.hero {
  max-width: 1100px;
  margin: 0 auto;
  padding: 70px 24px 40px;
  display: flex;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
}

.hero-text { flex: 1 1 460px; }

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--accent-2-text);
  background: var(--chip-mint);
  padding: 7px 16px;
  border-radius: 999px;
  margin-bottom: 14px;
}

.hero h1 {
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  line-height: 1.05;
}

.role {
  font-size: 1.25rem;
  color: var(--ink);
  font-weight: 500;
}

.highlight {
  color: var(--accent-2-text);
  font-weight: 700;
}

.hero-cta { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 20px; }

.hero-art { position: relative; flex: 1 1 280px; display: flex; justify-content: center; }

/* Decorative clay blobs peeking out behind the avatar — purely textural, aria-hidden. */
.hero-blob {
  position: absolute;
  border-radius: 50%;
  border: var(--border-w) solid var(--border);
  z-index: 0;
}
.hero-blob-1 {
  width: 90px;
  height: 90px;
  top: 6%;
  right: 14%;
  background: var(--chip-sky);
  animation: blob-float-a 9s ease-in-out infinite;
}
.hero-blob-2 {
  width: 56px;
  height: 56px;
  bottom: 4%;
  left: 12%;
  background: var(--chip-coral);
  animation: blob-float-b 11s ease-in-out infinite;
}

@keyframes blob-float-a {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-6px, 10px) rotate(8deg); }
}
@keyframes blob-float-b {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(6px, -8px) rotate(-8deg); }
}

.avatar-circle {
  position: relative;
  z-index: 1;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: var(--surface);
  border: var(--border-w) solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  animation: avatar-float 6s ease-in-out infinite;
}

@keyframes avatar-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.avatar-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

@media (max-width: 480px) {
  .hero { padding-top: 40px; }
}

@media (prefers-reduced-motion: reduce) {
  .avatar-circle, .hero-blob {
    animation: none !important;
    transition: none !important;
  }
}
</style>
