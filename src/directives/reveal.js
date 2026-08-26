// Replaces motion-v's `whileInView` scroll-reveal: adds `.in-view` to an element (or a
// staggered container) once it crosses the viewport, then stops watching. Respects
// prefers-reduced-motion by skipping straight to the revealed state.
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const vReveal = {
  mounted(el, binding) {
    if (binding.value === false) return

    if (prefersReducedMotion()) {
      el.classList.add('in-view')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
  },
}
