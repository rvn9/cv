<script setup>
import { ref } from 'vue'
import ClayButton from './ClayButton.vue'
import { useTheme } from '../composables/useTheme'

const { isDark, toggleTheme } = useTheme()
const mobileOpen = ref(false)

function closeMobile() {
  mobileOpen.value = false
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-inner">
      <div class="nav-start">
        <a href="#top" class="logo">RVNG<span>.</span></a>
        <ul class="nav-links">
          <li><a href="#about" @click="closeMobile">About</a></li>
          <li><a href="#experience" @click="closeMobile">Experience</a></li>
          <li><a href="#skills" @click="closeMobile">Skills</a></li>
          <li><a href="#achievements" @click="closeMobile">Achievements</a></li>
          <li><a href="#testimonial" @click="closeMobile">Testimonial</a></li>
          <li><a href="#contact" @click="closeMobile">Contact</a></li>
        </ul>
      </div>

      <div class="nav-actions">
        <button
          class="theme-toggle"
          type="button"
          :aria-pressed="isDark"
          aria-label="Toggle dark mode"
          @click="toggleTheme"
        >
          <!-- :key="isDark" remounts the icon on every toggle so the icon-swap transition replays. -->
          <Transition name="icon-swap" mode="out-in">
            <svg v-if="isDark" key="sun" class="theme-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.8" />
              <path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M12 2.5v2.4M12 19.1v2.4M4.4 4.4l1.7 1.7M17.9 17.9l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.4 19.6l1.7-1.7M17.9 6.1l1.7-1.7" />
            </svg>
            <svg v-else key="moon" class="theme-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M20.5 14.6a8.6 8.6 0 1 1-9.1-11 7 7 0 0 0 9.1 11Z" />
            </svg>
          </Transition>
        </button>

        <button
          class="nav-toggle"
          type="button"
          aria-label="Toggle menu"
          aria-controls="mobile-nav-menu"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <svg v-if="mobileOpen" class="nav-toggle-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M5 5l14 14M19 5L5 19" />
          </svg>
          <svg v-else class="nav-toggle-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      <Transition name="mobile-nav">
        <ul v-if="mobileOpen" id="mobile-nav-menu" class="nav-links open">
          <li><a href="#about" @click="closeMobile">About</a></li>
          <li><a href="#experience" @click="closeMobile">Experience</a></li>
          <li><a href="#skills" @click="closeMobile">Skills</a></li>
          <li><a href="#achievements" @click="closeMobile">Achievements</a></li>
          <li><a href="#testimonial" @click="closeMobile">Testimonial</a></li>
          <li><a href="#contact" @click="closeMobile">Contact</a></li>
        </ul>
      </Transition>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 16px 20px 0;
}

.nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 14px 24px;
  background: var(--navbar-bg);
  border: var(--border-w) solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: 4px 4px 0 var(--shadow);
  transition: background 0.4s ease;
}

.nav-start {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  display: inline-block;
  transition: transform 0.2s ease-out;
}
.logo:hover { transform: rotate(-3deg) scale(1.05); }
.logo span { color: var(--accent-2-text); }

.nav-links {
  list-style: none;
  display: flex;
  gap: 22px;
  margin: 0;
  padding: 0;
  font-weight: 600;
}
.nav-links a { padding: 6px 2px; opacity: 0.75; }
.nav-links a:hover { opacity: 1; color: var(--accent-2-text); }

.nav-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: var(--border-w) solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--ink);
  box-shadow: 3px 3px 0 var(--shadow);
  cursor: pointer;
  transition: box-shadow 0.12s ease-out, transform 0.12s ease-out, background 0.4s ease, color 0.4s ease;
}
.nav-toggle:hover {
  box-shadow: 5px 5px 0 var(--shadow);
  transform: translate(-1px, -1px);
}
.nav-toggle:active {
  box-shadow: 1px 1px 0 var(--shadow);
  transform: translate(2px, 2px);
}

.nav-toggle-icon { width: 20px; height: 20px; }

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: var(--border-w) solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--ink);
  box-shadow: 3px 3px 0 var(--shadow);
  cursor: pointer;
  transition: box-shadow 0.12s ease-out, transform 0.12s ease-out, background 0.4s ease, color 0.4s ease;
}
.theme-toggle:hover {
  box-shadow: 5px 5px 0 var(--shadow);
  transform: translate(-1px, -1px);
}
.theme-toggle:active {
  box-shadow: 1px 1px 0 var(--shadow);
  transform: translate(2px, 2px);
}

.theme-icon { width: 20px; height: 20px; }

.icon-swap-enter-active { transition: transform 0.2s ease-out, opacity 0.2s ease-out; }
.icon-swap-enter-from { transform: scale(0.5); opacity: 0; }
.icon-swap-leave-active { transition: opacity 0.12s ease-out; }
.icon-swap-leave-to { opacity: 0; }

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 860px) {
  .nav-links {
    display: none;
    position: absolute;
    top: 104px;
    left: 20px;
    right: 20px;
    background: var(--navbar-bg);
    border: var(--border-w) solid var(--border);
    border-radius: var(--radius-lg);
    flex-direction: column;
    padding: 16px 24px;
    gap: 14px;
    box-shadow: 4px 4px 0 var(--shadow);
    margin: 0;
  }
  .nav-links.open { display: flex; }
  .nav-toggle { display: flex; }
}

@media (prefers-reduced-motion: reduce) {
  .logo {
    animation: none !important;
    transition: none !important;
  }
  .theme-toggle {
    transition: none !important;
  }
}
</style>
