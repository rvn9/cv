import { ref } from 'vue'

// index.html already sets data-theme="dark" on <html> (before Vue mounts, to avoid a flash
// of the wrong theme). We read that attribute back here instead of re-deriving from
// localStorage/matchMedia, so this composable can never disagree with what's already on screen.
const isDark = ref(document.documentElement.getAttribute('data-theme') === 'dark')

function toggleTheme() {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
    localStorage.setItem('theme', 'light')
  }
}

export function useTheme() {
  return { isDark, toggleTheme }
}
