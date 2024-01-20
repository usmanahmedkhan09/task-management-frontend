<script lang="ts" setup>
import { useTaskStore } from '@/stores/Task.store'
import { computed, onMounted, ref } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
const props = defineProps({
  listCount: {
    type: Number
  },
  list: {
    type: Object,
    required: true
  }
})

const taskStore = useTaskStore()
const tasks = computed(() => {
  return taskStore.getTaskByListId(props.list!._id as string) as any
})

useSortable(`#${props.list?.name.split(' ').join('')}`, tasks.value, {
  group: {
    name: 'shared',
    put: true,
    pull: true
  },
  animation: 500,
  onAdd: async function (e: any) {
    let data = {
      listId: e.to.getAttribute('listId'),
      taskId: e.item.getAttribute('id')
    }
    await taskStore.updateTaskList(data.taskId, data.listId)
  }
})
</script>

<template>
  <div class="min-w-[280px] h-auto">
    <p class="mb-4 text-[#828fa3] text-sm font-medium capitalize">
      {{ list?.name }} ({{ tasks.length }})
    </p>
    <div
      class="overflow-x-auto h-full shared"
      :listId="list?._id"
      :id="list?.name.split(' ').join('')"
    >
      <TaskComponent
        v-for="task in tasks"
        :key="task._id"
        :task="task"
        :tasks="tasks"
        :listId="list?._id"
      />
    </div>
  </div>
</template>