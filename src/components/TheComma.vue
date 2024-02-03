<script setup lang="ts">
const props = defineProps<{
  isReached: boolean
}>()
</script>

<template>
  <div class="inline-block relative mr-0">
    <div class="w-[70px] text-center h-[180px] overflow-hidden inline-block ml-[-5px] box-border">
      <div>
        <span
          :class="isReached ? 'text-brand-light-0' : 'text-brand-light-20'"
          class='digit inline-block h-[180px] text-[200px] leading-[1]'>
          ,
        </span>
      </div>
    </div>
  </div>
</template>

