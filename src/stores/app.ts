import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { generateNextSequence, secondsDiff } from '@/utils'
import Dec from '@/utils/Dec'
// @ts-ignore
import ConfettiGenerator from 'confetti-js'
export const useAppStore = defineStore('app', () => {
  const isSetup = ref(false)
  const start = ref(0)
  const target = ref(0)
  const reachAt = ref(new Date())
  const startTime = ref(new Date())
  const caption = ref('')
  const current = ref(new Dec(0))
  const interval = ref(0)
  const isReached = ref(false)

  function setupApp(data : { start: number, target: number, reachAt: Date, caption: string }) {
    start.value = data.start
    current.value = new Dec(data.start)
    target.value = data.target
    reachAt.value = data.reachAt
    startTime.value = new Date()
    caption.value = data.caption
    isSetup.value = true

    startCounting()
  }

  const timeGap = computed(() => (secondsDiff(startTime.value, reachAt.value)))
  const valueGap = computed(() => (new Dec(target.value).minus(start.value)))
  const gapRatio = computed(() => ( new Dec(valueGap.value).times(60).div(timeGap.value).ceil()))

  function startCounting() {
    let tick = 0
    let currentSequence = generateNextSequence(gapRatio.value)

    interval.value = setInterval(() => {
      tick++
      if (tick >= 60) {
        currentSequence = generateNextSequence(gapRatio.value)
       tick = 0
     }
      const newCurrent = current.value.plus(currentSequence[tick])
      if (newCurrent.greaterThanOrEqualTo(target.value)) {
        stopCounting()
        current.value = new Dec(target.value)
        setIsReached()
      } else {
        current.value = newCurrent
      }
    }, 1000)
  }

  function stopCounting() {
    clearInterval(interval.value)
  }

  function setIsReached() {
    isReached.value = true
    const confetti = new ConfettiGenerator({
      target: 'my-canvas',
      max: 120,
      clock: 50,
      rotate: false
    })
    confetti.render()
  }

  return { isSetup, start, target, reachAt, caption, current, setupApp, timeGap, valueGap, isReached, startCounting, stopCounting }
})
