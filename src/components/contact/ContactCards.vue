<script setup>
/**
 * ContactCards — the contact row: an icon per link (email, LinkedIn, phone, GitHub) whose
 * card floats above it on hover/focus and whose href fires on click. Moving between icons
 * cross-fades the cards in the direction you travel while the floating panel morphs between
 * their sizes and positions, so the row reads as one object.
 */
import { computed, nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'
import GithubCard from './GithubCard.vue'

const props = defineProps({
  /** Adds the email icon and its card; clicking opens a mailto link. */
  email: { type: String, default: null },
  /** { number, href } — adds the phone icon and its card. */
  phone: { type: Object, default: null },
  /** { username, url?, avatarSrc? } — adds the GitHub icon and its contribution-graph card. */
  github: { type: Object, default: null },
  /** { url, name, title, avatarSrc? } — adds the LinkedIn icon and its profile card. */
  linkedin: { type: Object, default: null },
})

const items = computed(() =>
  [
    props.email && { key: 'email', label: 'Email', href: `mailto:${props.email}` },
    props.linkedin && { key: 'linkedin', label: 'LinkedIn', href: props.linkedin.url },
    props.phone && { key: 'phone', label: 'Phone', href: props.phone.href },
    props.github && {
      key: 'github',
      label: 'GitHub',
      href: props.github.url ?? `https://github.com/${props.github.username}`,
    },
  ].filter(Boolean),
)

const open = ref(false)
const index = ref(0)
const direction = ref(1)
/** The card being replaced, kept mounted until its exit animation ends. */
const outgoing = ref(null)
const entryKey = ref(0)
const box = reactive({ left: 0, width: 0, height: 0 })
/** The first card appears in place; only later ones morph from the previous size. */
const morphing = ref(false)

const contentRef = ref(null)
const linkRefs = ref([])

function setLinkRef(el, i) {
  linkRefs.value[i] = el
}

function measure() {
  const content = contentRef.value
  const link = linkRefs.value[index.value]
  if (!content || !link) return
  box.left = link.offsetLeft + link.offsetWidth / 2
  box.width = content.offsetWidth
  box.height = content.offsetHeight
}

watch([open, index], async () => {
  if (!open.value) return
  await nextTick()
  measure()
})

// The GitHub card's contribution graph arrives asynchronously and grows the content after
// it's already measured once — without this, the panel stays clipped to its pre-fetch size
// and the late-arriving grid overflows past the rounded, overflow-hidden edge.
let resizeObserver
watch(contentRef, (el) => {
  resizeObserver?.disconnect()
  resizeObserver = null
  if (!el) return
  resizeObserver = new ResizeObserver(() => {
    if (open.value) measure()
  })
  resizeObserver.observe(el)
})
onBeforeUnmount(() => resizeObserver?.disconnect())

// `animationend` never fires while the tab is hidden or motion is reduced, so the leaving
// card is dropped on a timer as well.
let outgoingTimeout
watch(outgoing, (value) => {
  clearTimeout(outgoingTimeout)
  if (!value) return
  outgoingTimeout = setTimeout(() => {
    outgoing.value = null
  }, 400)
})
onBeforeUnmount(() => clearTimeout(outgoingTimeout))

function handleEnter(next) {
  if (open.value && next === index.value) return
  if (open.value) {
    outgoing.value = { index: index.value, direction: Math.sign(next - index.value) || 1, key: entryKey.value }
    direction.value = Math.sign(next - index.value) || 1
  }
  morphing.value = open.value
  index.value = next
  entryKey.value += 1
  open.value = true
}

function closeAll() {
  open.value = false
  outgoing.value = null
  morphing.value = false
}

const boxStyle = computed(() => ({
  left: `${box.left}px`,
  width: `${box.width}px`,
  height: `${box.height}px`,
  contain: 'paint',
}))
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <div class="relative flex" @mouseleave="closeAll">
      <a
        v-for="(item, i) in items"
        :key="item.key"
        :ref="(el) => setLinkRef(el, i)"
        :href="item.href"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="item.label"
        class="z-10 p-2 text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
        @mouseenter="handleEnter(i)"
        @focus="handleEnter(i)"
      >
        <svg v-if="item.key === 'email'" viewBox="0 0 24 24" class="size-6 fill-current">
          <path
            d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"
          />
          <path
            d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"
          />
        </svg>
        <svg v-else-if="item.key === 'phone'" viewBox="0 0 24 24" class="size-6 fill-current">
          <path
            d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.5 2.5.8 3.8.9.6 0 1 .5 1 1.1v3.6c0 .6-.5 1.1-1.1 1.1C10.6 21.7 2.3 13.4 2.3 3.9 2.3 3.3 2.8 2.8 3.4 2.8H7c.6 0 1.1.4 1.1 1 .1 1.3.4 2.6.9 3.8.2.4.1.8-.2 1.1L6.6 10.8Z"
          />
        </svg>
        <svg v-else-if="item.key === 'github'" viewBox="0 0 24 24" class="size-6 fill-current">
          <path
            d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"
          />
        </svg>
        <svg v-else viewBox="0 0 24 24" class="size-6 fill-current">
          <path
            d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.75-1.95 4 0 4.4 2.4 4.4 5.6V21h-4v-5.6c0-1.35-.03-3.1-1.9-3.1-1.9 0-2.2 1.45-2.2 2.99V21h-4V9Z"
          />
        </svg>
      </a>

      <div
        :style="boxStyle"
        class="cc-panel absolute bottom-[calc(100%+0.5rem)] flex origin-bottom items-end overflow-hidden"
        :class="[
          morphing
            ? 'transition-[left,width,height,opacity,transform] duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)]'
            : 'transition-[opacity,transform] duration-200 ease-out',
          open
            ? '-translate-x-1/2 scale-100 opacity-100'
            : 'pointer-events-none -translate-x-1/2 translate-y-1 scale-[0.97] opacity-0',
        ]"
      >
        <div
          v-if="outgoing"
          :key="`out-${outgoing.key}`"
          :style="{ '--cc-dir': outgoing.direction, animation: 'cc-out 0.35s cubic-bezier(0.32,0.72,0,1) forwards' }"
          class="absolute"
          @animationend="(event) => { if (event.target === event.currentTarget) outgoing = null }"
        >
          <div v-if="items[outgoing.index]?.key === 'email'" class="flex w-64 flex-col gap-1 p-4">
            <span class="text-sm font-medium">{{ email }}</span>
          </div>
          <div v-else-if="items[outgoing.index]?.key === 'phone'" class="flex w-64 flex-col gap-1 p-4">
            <span class="font-medium">{{ phone?.number }}</span>
          </div>
          <GithubCard
            v-else-if="items[outgoing.index]?.key === 'github'"
            :username="github.username"
            :avatar-src="github.avatarSrc"
          />
          <div v-else-if="items[outgoing.index]?.key === 'linkedin'" class="flex w-72 flex-col gap-3 p-4">
            <div class="flex items-center gap-3">
              <img
                v-if="linkedin.avatarSrc"
                :src="linkedin.avatarSrc"
                alt=""
                class="size-10 shrink-0 rounded-full object-cover"
              />
              <span v-else class="block size-10 shrink-0 rounded-full bg-gradient-to-br from-orange-300 to-red-500" />
              <div class="flex flex-col">
                <span class="font-medium">{{ linkedin.name }}</span>
                <span class="text-sm text-[var(--page-ink)]/70">{{ linkedin.title }}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          :key="`in-${entryKey}`"
          ref="contentRef"
          :style="
            morphing
              ? { '--cc-dir': direction, animation: 'cc-in 0.4s cubic-bezier(0.32,0.72,0,1) backwards' }
              : {}
          "
          class="absolute"
        >
          <div v-if="items[index]?.key === 'email'" class="flex w-64 flex-col gap-1 p-4">
            <span class="text-sm font-medium">{{ email }}</span>
          </div>
          <div v-else-if="items[index]?.key === 'phone'" class="flex w-64 flex-col gap-1 p-4">
            <span class="font-medium">{{ phone?.number }}</span>
          </div>
          <GithubCard
            v-else-if="items[index]?.key === 'github'"
            :username="github.username"
            :avatar-src="github.avatarSrc"
          />
          <div v-else-if="items[index]?.key === 'linkedin'" class="flex w-72 flex-col gap-3 p-4">
            <div class="flex items-center gap-3">
              <img
                v-if="linkedin.avatarSrc"
                :src="linkedin.avatarSrc"
                alt=""
                class="size-10 shrink-0 rounded-full object-cover"
              />
              <span v-else class="block size-10 shrink-0 rounded-full bg-gradient-to-br from-orange-300 to-red-500" />
              <div class="flex flex-col">
                <span class="font-medium">{{ linkedin.name }}</span>
                <span class="text-sm text-[var(--page-ink)]/70">{{ linkedin.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pointer bridge, so the card stays open while moving towards it. -->
      <div class="absolute inset-0 -top-2" />
    </div>
  </div>
</template>

<style>
/* --page-ink (not --ink) on purpose: this panel floats as its own surface above
   .contact-card, which locally reassigns --ink to equal --bg so ITS OWN flush text stays
   legible against its inverted background. --page-ink is the one unshadowed copy of ink
   that stays correct regardless of that override — same pairing ClayButton's .btn-clay
   uses for controls that sit on --surface inside an inverted block. */
.cc-panel {
  background: var(--surface);
  color: var(--page-ink);
  border: var(--border-w) solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-x) var(--shadow-y) 0 var(--shadow);
}

/* Layout hook for the `class="contact-links"` passed in from ContactSection.vue — lives here
   (unscoped, like .cc-panel above) because it targets this component's own root element. */
.contact-links {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 24px;
}

@keyframes cc-in {
  from {
    opacity: 0;
    transform: translateX(calc(var(--cc-dir, 1) * 64px)) scale(0.97);
    filter: blur(6px);
  }
}
@keyframes cc-out {
  to {
    opacity: 0;
    transform: translateX(calc(var(--cc-dir, 1) * -64px)) scale(0.97);
    filter: blur(6px);
  }
}
</style>
