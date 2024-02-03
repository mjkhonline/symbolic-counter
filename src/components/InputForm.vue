<script setup lang="ts">
import { ref } from 'vue'
import { convertTimeToDate } from '@/utils'
import { useStorage } from '@vueuse/core'

const emit = defineEmits(['form-submit'])

const formData = useStorage('form-data', {
  start: 0,
  target: 100,
  reachAt: '00:00',
  caption: ''
})
function onClick() {
  emit('form-submit', {
    start: formData.value.start,
    target: formData.value.target,
    reachAt: convertTimeToDate(formData.value.reachAt),
    caption: formData.value.caption
  })
}
</script>

<template>
  <div class="absolute top-1/2 -translate-y-1/2 w-1/3 h-auto bg-brand-light-20 p-12 z-10 rounded-2xl">
    <label class="flex items-center mb-8">
      <span class="text-nowrap">
        Starting Count:
      </span>
      <input v-model="formData.start" class="p-2 rounded-md ml-3 w-full" type="number">
    </label>

    <label class="flex items-center mb-8">
      <span class="text-nowrap">
        Target:
      </span>
      <input v-model="formData.target" class="p-2 rounded-md ml-3 w-full" type="number">
    </label>

    <label class="flex items-center mb-8">
      <span class="text-nowrap">
        Reach Target at:
      </span>
      <input v-model="formData.reachAt" class="p-2 rounded-md ml-3 w-full" type="time">
    </label>

    <label class="flex items-center mb-8">
      <span class="text-nowrap">
        Caption:
      </span>
      <input v-model="formData.caption" class="p-2 rounded-md ml-3 w-full" type="text">
    </label>

    <button type="button" class="bg-brand-light-80 text-white p-4 rounded-md w-full" @click="onClick">
      Go!!
    </button>
  </div>
</template>
