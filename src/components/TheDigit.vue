<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: number,
  isReached: boolean
}>()

const digitStyle = computed(() => {
  const translateY =  {
    0: '0',
    1: '-180px',
    2: '-360px',
    3: '-540px',
    4: '-720px',
    5: '-900px',
    6: '-1080px',
    7: '-1260px',
    8: '-1440px',
    9: '-1620px'
  }[props.value]

  return {
    transform: `translateY(${translateY})`
  }
})
</script>

<template>
  <div class="inline-block relative mr-[10px]">
    <div class="w-[140px] text-center h-[180px] overflow-hidden inline-block ml-[-5px] box-border">
      <div class='digit-wrapper duration-700' :style="digitStyle">
        <span
          v-for="i in 10"
          :key="i"
          :class="isReached ? 'text-brand-light-0' : 'text-brand-light-20'"
          class='digit inline-block h-[180px] text-[200px] leading-[1]'>
          {{ i - 1 }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
