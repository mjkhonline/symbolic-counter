import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { secondsDiff } from '@/utils'
// @ts-ignore
import ConfettiGenerator from 'confetti-js'
export const useAppStore = defineStore('app', () => {
  const isSetup = ref(false)
  const start = ref(0)
  const target = ref(0)
  const reachAt = ref(new Date())
  const startTime = ref(new Date())
  const stopDurationOnTarget = ref(0)
  const caption = ref('')
  const current = ref(0)

  function setupApp(data : { start: number, target: number, reachAt: Date, stopDurationOnTarget: number, caption: string }) {
    start.value = data.start
    current.value = data.start
    target.value = data.target
    reachAt.value = data.reachAt
    startTime.value = new Date()
    stopDurationOnTarget.value = data.stopDurationOnTarget
    caption.value = data.caption
    isSetup.value = true
  }

  const timeGap = computed(() => (secondsDiff(startTime.value, reachAt.value)))
  const valueGap = computed(() => (target.value - start.value))

  //const isReached = true // computed(() => current.value >= target.value)

  const isReached = ref(false)
  function switchIsReached() {
    isReached.value = !isReached.value
    const confetti = new ConfettiGenerator({
      target: 'my-canvas',
      max: 120,
      clock: 50,
      rotate: false
    })
    confetti.render()
  }

  return { isSetup, start, target, reachAt, stopDurationOnTarget, caption, current, setupApp, timeGap, valueGap, isReached, switchIsReached }
})
