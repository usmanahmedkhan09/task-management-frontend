<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useTaskStore } from '@/stores/Task.store'
import { useListStore } from '@/stores/List.store'
import { useForm, Form, useFieldArray } from 'vee-validate'
import { useValidators } from '@/composables/rules'

const props = defineProps({
  listId: {
    type: String,
    required: true
  }
})

const {
  handleSubmit,
  isSubmitting,
  errors,
  defineComponentBinds,
  setValues,
  setFieldValue,
  resetForm
} = useForm({})

const tasks = ref<any[]>([])
const subTaskModal = ref(false)
const taskStore = useTaskStore()
const listStore = useListStore()
const listId = defineComponentBinds('listId')

const getAllTask = async () => {
  let response: any = await taskStore.getAllTasks(props.listId as string)
  if (response.success) {
    tasks.value = response.data
  }
}

onMounted(() => getAllTask())
</script>
<template>
  <div
    @click="subTaskModal = true"
    class="rounded-lg mb-5 px-5 py-4 w-[280px] bg-primary cursor-pointer"
    v-for="x in tasks"
    :key="x"
  >
    <p class="text-white font-medium text-sm">
      {{ x.title }}
    </p>
    <p class="text-[#828fa3] text-xs">0 of 2 subtask</p>
  </div>
  <Dialog v-model:visible="subTaskModal" modal :style="{ width: '480px' }" :dismissableMask="true">
    <template #container="{}">
      <div class="p-8 flex flex-col w-50 dark:bg-primary bg-white rounded">
        <h3 class="text-white font-semibold mb-5">QA and test all major user journeys</h3>
        <p class="text-sm text-[#828fa3] mb-5">
          Once we feel version one is ready, we need to rigorously test it both internally and
          externally to identify any major gaps.
        </p>
        <p class="text-[#828fa3] mb-4 font-bold">Subtasks (0 of 0)</p>
        <div class="flex flex-col gap-2">
          <label for="status" class="dark:text-white text-primary text-sm font-medium"
            >Current Status</label
          >
          <Dropdown
            v-model="listId"
            :options="listStore.lists"
            id="status"
            optionLabel="name"
            placeholder="Select a list"
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
</template>