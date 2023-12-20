<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCommonStore } from './stores/Common'
import Toast from 'primevue/toast'

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
  <Toast />
  <Topbar class="bg-white dark:bg-primary p-4" />
  <div class="grid grid-cols-[16%_auto]" style="height: calc(100% - 80px)">
    <Sidebar class="bg-white dark:bg-primary" />
    <main class="bg-white dark:bg-secondary p-4 overflow-hidden">
      <router-view></router-view>
    </main>
  </div>
</template>

