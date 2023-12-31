<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useForm, Form, useFieldArray } from 'vee-validate'
import { useValidators } from '@/composables/rules'
import TaskModel from '../Models/Task.model'

const props = defineProps({
  showModal: Boolean,
  default: () => false
})

const emit = defineEmits(['update:modelValue'])

import { useBoardStore } from '@/stores/Board.store'
import { useTaskStore } from '@/stores/Task.store'

const boardStore = useBoardStore()
const taskStore = useTaskStore()

const show = computed({
  get: () => props.showModal,
  set: (val) => emit('update:modelValue', false)
})
const task = ref(new TaskModel())
const { taskSchema } = useValidators()
const {
  handleSubmit,
  isSubmitting,
  errors,
  defineComponentBinds,
  setValues,
  setFieldValue,
  resetForm
} = useForm({
  initialValues: task,
  validationSchema: taskSchema
})

const title = defineComponentBinds('title')
const description = defineComponentBinds('description')
const listId = defineComponentBinds('listId')

const { remove, push, fields, replace } = useFieldArray<any>('subtasks')

const onSubmit = handleSubmit(async (task: TaskModel) => {
  task.subtasks = task.subtasks.map((x: any) => ({ value: x.value || x }))
  await taskStore.addTask(task)
})

const setInitialState = () => {
  if (boardStore.board) task.value.listId = boardStore.board.lists[0] as any
}

onMounted(() => setInitialState())
</script>
<template>
  <Dialog v-model:visible="show" modal :style="{ width: '480px' }" :dismissableMask="true">
    <template #container="{}">
      <div class="p-8 flex flex-col w-50 dark:bg-primary bg-white rounded">
        <h3 class="text-white font-semibold">Add New Task</h3>
        <form class="mt-5" @submit="onSubmit">
          <div class="flex flex-col gap-5">
            <div class="flex flex-col field">
              <label for="name" class="dark:text-white text-primary text-sm font-medium"
                >Task Name:</label
              >
              <InputText
                class="bg-primary text-white mt-1 h-8 placeholder:text-[#828fa340] focus:outline-none focus:shadow-none focus:outline-purple focus:border-0"
                autocomplete="off"
                placeholder="e.g. Take coffee Break"
                name="name"
                id="name"
                aria-describedby="name-help"
                v-bind="title"
                :class="errors.title ? 'p-invalid' : 'border-[#828fa340]'"
              />
              <small class="p-error capitalize mt-2" id="text-error">{{ errors.title }}</small>
            </div>
            <div class="flex flex-col field">
              <label for="name" class="dark:text-white text-primary text-sm font-medium"
                >Task Description:</label
              >
              <Textarea
                autoResize
                class="bg-primary text-white mt-1 h-8 border-[#828fa340] placeholder:text-[#828fa340] focus:outline-none focus:shadow-none focus:outline-purple focus:border-0"
                autocomplete="off"
                placeholder="e.g. It's always good to take a break.This 15 minutes break will recharge the batteries a little"
                name="name"
                id="name"
                aria-describedby="name-help"
                v-bind="description"
              />
            </div>
            <div class="flex flex-col">
              <label for="list" class="text-white text-sm font-medium">Subtasks:</label>
              <div v-for="(field, idx) in fields" :key="field.key">
                <div class="flex items-center gap-3">
                  <InputText
                    class="bg-primary w-full border-[#828fa340] text-white mt-3 h-8 placeholder:text-[#828fa340] focus:outline-none focus:shadow-none focus:outline-purple focus:border-0"
                    autocomplete="off"
                    placeholder="e.g. Doing"
                    id="list"
                    v-model="field.value"
                    type="text"
                  />
                  <i @click="remove(idx)" class="pi pi-times text-white mt-3" />
                </div>
              </div>
            </div>
            <Button
              @click="push('')"
              iconClass="mx-auto"
              label="Add New Subtask"
              severity="success"
              class="rounded-full bg-white text-purple font-bold w-full"
            />
            <Dropdown
              v-bind="listId"
              :options="boardStore.board.lists"
              optionLabel="name"
              placeholder="Select a City"
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
            <Button
              :loading="isSubmitting"
              type="submit"
              :label="'Create New Task'"
              severity="success"
              class="rounded-full bg-[#635fc7] text-white w-full font-bold"
            />
          </div>
        </form>
      </div>
    </template>
  </Dialog>
</template>