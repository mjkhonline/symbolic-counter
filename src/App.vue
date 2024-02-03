<script setup lang="ts">
import TheDigit from '@/components/TheDigit.vue'
import { computed } from 'vue'
import InputForm from '@/components/InputForm.vue'
import { numberToArray } from '@/utils'
import { useAppStore } from '@/stores/app'


const app = useAppStore()

const digits = computed(() => numberToArray(app.current))

setInterval(()=> {
  app.current+= Math.ceil(app.valueGap / app.timeGap)
}, 1000)
</script>

<template>
  <main class="relative h-screen w-screen flex flex-col justify-center items-center duration-500 ease-out" :class="app.isReached ? 'bg-green-60' : 'bg-brand-light-60'">
    <canvas id="my-canvas" class="z-[20] h-screen w-screen" :class="app.isReached ? 'fixed' : 'hidden'"></canvas>
    <InputForm v-if="!app.isSetup" @form-submit="app.setupApp" />
    <div class="digits-wrapper relative duration-500 ease-out" :class="{ 'scale-x-125 hide-before-after': app.isReached }">
      <TheDigit
        v-for="(digit, i) in digits"
        :key="i"
        :value="digit"
        :is-reached="app.isReached"
        @click="app.switchIsReached()"
      />
    </div>
    <div class="text-center text-3xl mt-10" :class="app.isReached ? 'text-white' : 'text-brand-dark-30'">
      {{ app.caption }}
    </div>
  </main>
</template>

<style scoped>
.digits-wrapper:before, .digits-wrapper:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  left: 0;
  height: 20px;
  z-index: 1;
}

.digits-wrapper.hide-before-after:before, .digits-wrapper.hide-before-after:after {
  display: none;
}

.digits-wrapper:before {
  top: 0;
  background-size: 100%;
  background-image: linear-gradient(to bottom, #402B76 0%, rgba(241, 97, 75, 0) 100%);
}
.digits-wrapper:after {
  bottom: 0;
  background-size: 100%;
  background-image: linear-gradient(to bottom, rgba(241, 97, 75, 0) 0%, #402B76 100%);
}
</style>
