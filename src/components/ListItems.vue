<script lang="ts" setup>
import TaskComponent from './TaskComponent.vue'

import { computed, onMounted } from 'vue'
defineProps({
  listCount: {
    type: Number
  },
  list: {
    type: Object,
    require: true
  }
})
</script>

<template>
  <div class="min-w-[280px] h-auto">
    <p class="mb-4 text-[#828fa3] text-sm font-medium capitalize">
      {{ list?.name }} ({{ tasksLength }})
    </p>
    <div class="overflow-x-auto h-full">
      <TaskComponent :listId="list?._id" />
    </div>
  </div>
</template>