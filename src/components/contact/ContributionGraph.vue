<script setup>
import { computed, ref } from 'vue'

const LEVELS = [
  'bg-[var(--page-ink)]/10',
  'bg-green-600/20',
  'bg-green-600/40',
  'bg-green-600/65',
  'bg-green-600/90',
]

function levelOf(count) {
  return count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4
}

const props = defineProps({
  days: { type: Array, default: () => [] },
  locale: { type: String, default: undefined },
})

const containerRef = ref(null)
const tooltipRef = ref(null)
/** { day: { date, count }, left, top } | null */
const hovered = ref(null)

/** A year of activity in a 7-row grid, matching the ISO weekday of the first day. */
const weeks = computed(() => {
  if (props.days.length === 0) return []
  const result = []
  let week = Array.from({ length: new Date(`${props.days[0].date}T00:00:00Z`).getUTCDay() })
  for (const day of props.days) {
    week.push(day)
    if (week.length === 7) {
      result.push(week)
      week = []
    }
  }
  if (week.length > 0) result.push([...week, ...Array.from({ length: 7 - week.length })])
  return result
})

const formatter = computed(
  () => new Intl.DateTimeFormat(props.locale, { day: 'numeric', month: 'long', timeZone: 'UTC' }),
)

const tooltipLeft = computed(() => {
  if (!hovered.value) return 0
  const containerWidth = containerRef.value?.clientWidth ?? 0
  const tooltipWidth = tooltipRef.value?.clientWidth ?? 0
  return Math.min(Math.max(hovered.value.left, tooltipWidth / 2), containerWidth - tooltipWidth / 2)
})

const tooltipText = computed(() => {
  if (!hovered.value) return ''
  const { count, date } = hovered.value.day
  return `${count} contribution${count === 1 ? '' : 's'} · ${formatter.value.format(new Date(date))}`
})

function onPointerOver(event) {
  const target = event.target
  const { date, count } = target.dataset
  if (!date) {
    hovered.value = null
    return
  }
  hovered.value = {
    day: { date, count: Number(count) },
    left: target.offsetLeft + target.offsetWidth / 2,
    top: target.offsetTop,
  }
}
</script>

<template>
  <div
    ref="containerRef"
    class="relative flex w-full flex-col gap-2"
    @pointerover="onPointerOver"
    @pointerleave="hovered = null"
  >
    <div
      class="grid grid-flow-col grid-rows-7 gap-[1.5px]"
      :style="{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }"
    >
      <template v-for="(week, weekIndex) in weeks" :key="weekIndex">
        <div
          v-for="(day, dayIndex) in week"
          :key="dayIndex"
          :data-date="day?.date"
          :data-count="day?.count"
          class="aspect-square w-full rounded-[1.5px]"
          :class="day ? LEVELS[day.level ?? levelOf(day.count)] : ''"
        />
      </template>
    </div>

    <div
      ref="tooltipRef"
      :style="{ left: `${tooltipLeft}px`, top: `${hovered?.top ?? 0}px` }"
      class="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+0.25rem)] rounded-xl bg-[var(--page-ink)] px-2 py-1 text-xs whitespace-nowrap text-[var(--surface)] shadow-lg transition-opacity duration-100"
      :class="hovered ? 'opacity-100' : 'opacity-0'"
    >
      {{ tooltipText }}
    </div>
  </div>
</template>
