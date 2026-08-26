<script setup>
import ClayCard from './ClayCard.vue'
import ContactCards from './contact/ContactCards.vue'

const base = import.meta.env.BASE_URL
</script>

<template>
  <section id="contact" class="section contact-section">
    <ClayCard class="contact-card">
      <h2>Let's build something great together <span class="wiggle" aria-hidden="true">🎨</span></h2>
      <p>
        Open to work &amp; interesting product challenges. Based in Tangerang
        Selatan, Indonesia — happy to work remotely or relocate if necesary.
      </p>
      <ContactCards
        class="contact-links"
        email="andreasagustinus11@gmail.com"
        :phone="{ number: '+62 856-9484-2850', href: 'https://wa.me/+6285694842850'}"
        :linkedin="{
          url: 'https://www.linkedin.com/in/andreas-agustinus/',
          name: 'Andreas Agustinus',
          title: 'Senior Flutter Engineer',
          avatarSrc: `${base}assets/profile-photo.jpg`,
        }"
        :github="{ username: 'rvn9', avatarSrc: `${base}assets/profile-photo.jpg` }"
      />
    </ClayCard>
  </section>
</template>

<style scoped>
.contact-card h2 { font-size: 1.9rem; }
.contact-card p { max-width: 520px; margin-left: auto; margin-right: auto; }
</style>
