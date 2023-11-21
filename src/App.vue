<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCommonStore } from './stores/Common'

const { appMode } = useCommonStore()
const darkElement = ref<HTMLElement | null>(null)
onMounted(() => {
  darkElement.value = document.querySelector('.ab')
  if (darkElement.value) {
    darkElement.value.classList.add(appMode)
  }
})
</script>

<template>
  <router-view></router-view>
</template>

