<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTaskStore } from '@/stores/Task.store'
import { useListStore } from '@/stores/List.store'
import { useForm, Form, useFieldArray } from 'vee-validate'
import { useValidators } from '@/composables/rules'
import AddTaskPopup from './AddTaskPopup.vue'
import TaskModel from '@/Models/Task.model'

const props = defineProps({
  listId: {
    type: String,
    required: true
  }
})

const subTaskModal = ref(false)
const showModal = ref(false)
const taskStore = useTaskStore()
const listStore = useListStore()
let lstId = ref(props.listId)
let menu = ref()

const options = ref<any>([
  {
    label: 'Edit',
    icon: 'pi pi-file'
  },
  {
    label: 'Delete',
    icon: 'pi pi-file'
  }
])

const tasks = computed(() => {
  return taskStore.getTaskByListId(props.listId as string) as any
})

const task = ref<TaskModel>(new TaskModel())
const toggleTask = (payload: any) => {
  task.value = payload
  subTaskModal.value = true
}

const toggle = (event: any) => {
  menu.value.toggle(event)
}

const handleTaskAction = async (action: string) => {
  if (action == 'Edit') {
    task.value.subtasks = task.value.subtasks.map((x) => {
      return {
        value: x.description,
        ...x
      }
    })
    showModal.value = true
  } else {
    await taskStore.deleteTask(task.value._id as string)
  }
}
</script>
<template>
  <div
    class="rounded-lg mb-5 px-5 py-4 w-[280px] bg-primary cursor-pointer"
    v-for="x in tasks"
    :key="x"
    @click="toggleTask(x)"
  >
    <p class="text-white font-medium text-sm capitalize">
      {{ x.title }}
    </p>
    <p class="text-[#828fa3] text-xs" v-if="x.subtasks?.length">
      {{ x.subtasks.filter((x) => x.isComplete).length }} of {{ x.subtasks.length }} subtask
    </p>
  </div>
  <Dialog v-model:visible="subTaskModal" modal :style="{ width: '480px' }" :dismissableMask="true">
    <template #container="{}">
      <div class="p-8 flex flex-col w-50 dark:bg-primary bg-white rounded">
        <div class="flex justify-between items-center mb-5">
          <h3 class="text-white font-semibold capitalize">{{ task.title }}</h3>
          <i @click="toggle" class="pi pi-ellipsis-v text-white" />
          <TieredMenu
            ref="menu"
            :model="options"
            popup
            :pt="{
              root: { class: 'bg-primary flex flex-col gap-2 px-3' },
              menuitem: { class: 'text-white mb-2 cursor-pointer' },
              content: { class: 'p-2 rounded' }
            }"
          >
            <template #item="{ item }">
              <span class="text-white mb-2" @click="handleTaskAction(item.label)">{{
                item.label
              }}</span>
            </template>
          </TieredMenu>
        </div>
        <p class="text-sm text-[#828fa3] mb-5">
          {{ task.description }}
        </p>
        <p class="text-[#828fa3] mb-4 font-bold" v-if="task && task.subtask?.length">
          Subtasks ({{ task.subtasks.filter((x) => x.isComplete).length }} of
          {{ task.subtasks.length }})
        </p>
        <div
          v-for="subtask in task.subtasks"
          :key="subtask._id"
          class="bg-[#20212c] px-3 py-3 mb-2 rounded flex items-center gap-3 hover:bg-[rgba(99,95,199,.25)]"
        >
          <Checkbox v-model="subtask.isComplete" :binary="true" />
          <span
            class="text-white capitalize"
            :class="{ 'line-through opacity-[.5]': subtask.isComplete }"
            >{{ subtask.description }}</span
          >
        </div>
        <div class="flex flex-col gap-2">
          <label for="status" class="dark:text-white text-primary text-sm font-medium"
            >Current Status</label
          >
          <Dropdown
            :modelValue="lstId"
            optionValue="_id"
            :options="listStore.lists"
            id="status"
            optionLabel="name"
            placeholder="Select a list"
            disabled
            class="bg-primary text-white placeholder:text-white border-[#828fa340]"
            :pt="{
              root: { class: 'placeholder:text-white' },
              input: { class: 'text-white' },
              item: { class: 'text-white' },
              trigger: { class: 'text-white' },
              panel: {
                class: 'bg-primary text-white'
              }
            }"
          />
        </div>
      </div>
    </template>
  </Dialog>
  <AddTaskPopup
    v-if="showModal"
    :task="task"
    :showModal="showModal"
    @update:modelValue="showModal = false"
    :isEdit="true"
  />
</template>