<script lang="ts" setup>
import TaskComponent from './TaskComponent.vue'
import { useTaskStore } from '@/stores/Task.store'
import { computed, onMounted } from 'vue'
const props = defineProps({
  listCount: {
    type: Number
  },
  list: {
    type: Object,
    require: true
  }
})

const taskStore = useTaskStore()
const tasks = computed(() => {
  return taskStore.getTaskByListId(props.list!._id as string) as any
})
</script>

<template>
  <div class="min-w-[280px] h-auto">
    <p class="mb-4 text-[#828fa3] text-sm font-medium capitalize">
      {{ list?.name }} ({{ tasks.length }})
    </p>
    <div class="overflow-x-auto h-full">
      <TaskComponent :listId="list?._id" />
    </div>
  </div>
</template>