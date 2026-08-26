<script setup>
import { computed, ref, watchEffect } from 'vue'
import ContributionGraph from './ContributionGraph.vue'

const API = 'https://github-contributions-api.jogruber.de/v4'

const props = defineProps({
  username: { type: String, required: true },
  /** Pass a year of days to skip the client-side fetch. */
  days: { type: Array, default: null },
  avatarSrc: { type: String, default: null },
  locale: { type: String, default: undefined },
  contributionsLabel: { type: String, default: 'contributions in the last year' },
})

const fetched = ref(null)

watchEffect((onCleanup) => {
  if (props.days) return
  let cancelled = false

  fetch(`${API}/${props.username}?y=last`)
    .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
    .then((data) => {
      if (!cancelled) fetched.value = data.contributions
    })
    // The graph is decorative: an empty grid beats a crash.
    .catch(() => {
      if (!cancelled) fetched.value = []
    })

  onCleanup(() => {
    cancelled = true
  })
})

const days = computed(() => props.days ?? fetched.value ?? [])
const total = computed(() => days.value.reduce((sum, day) => sum + day.count, 0))
</script>

<template>
  <div class="flex w-[min(22rem,calc(100vw-4rem))] flex-col gap-3 p-3">
    <div class="flex items-center gap-3">
      <img
        v-if="avatarSrc"
        :src="avatarSrc"
        alt=""
        class="size-10 shrink-0 rounded-full object-cover"
      />
      <span v-else class="block size-10 shrink-0 rounded-full bg-gradient-to-br from-orange-300 to-red-500" />
      <div class="flex flex-col">
        <span class="font-medium">{{ username }}</span>
        <span class="text-sm text-[var(--page-ink)]/70">
          {{ total.toLocaleString(locale) }} {{ contributionsLabel }}
        </span>
      </div>
    </div>
    <ContributionGraph :days="days" :locale="locale" />
  </div>
</template>
