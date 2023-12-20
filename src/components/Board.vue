<script setup lang="ts">
import Board from '@/Models/Board.model'
import { useBoardStore } from '@/stores/Board.store'
import { useListStore } from '@/stores/List.store'
import { useForm, Form, useFieldArray } from 'vee-validate'
import { useValidators } from '@/composables/rules'
import { computed, onMounted, watch } from 'vue'

const boardStore = useBoardStore()
const { addBoard, UpdateBoard } = boardStore

const listStore = useListStore()
const { boardSchema } = useValidators()

const {
  handleSubmit,
  isSubmitting,
  errors,
  defineComponentBinds,
  setValues,
  setFieldValue,
  resetForm
} = useForm({
  initialValues: boardStore.board,
  validationSchema: boardSchema
})

const name = defineComponentBinds('name')

const { remove, push, fields, replace } = useFieldArray<any>('lists')

const onSubmit = handleSubmit(async (values: Board) => {
  let list = values.lists.map((x: any) => {
    if (!x.value) {
      return {
        value: x
      }
    }
    return x
  })
  values.lists = list
  if (boardStore.isEdit) {
    values._id = boardStore.board._id
    await UpdateBoard(values)
  } else await addBoard(values)
})

watch([() => boardStore.isEdit, () => boardStore.board._id], () => {
  if (boardStore.isEdit) {
    setValues({
      name: boardStore.board.name
    })
    fields.value = boardStore.board?.lists.map((x) => {
      return {
        value: x.name,
        ...x
      }
    }) as any
    replace(fields.value)
  } else {
    resetForm()
  }
})

const removeList = async (id: number) => {
  let list: any = fields.value[id]
  if (list._id) {
    await listStore.deleteListById(list._id).then((res) => {
      remove(id)
    })
  } else remove(id)
}
</script>
<template>
  <Dialog
    v-model:visible="boardStore.showBoard"
    modal
    :style="{ width: '480px' }"
    :dismissableMask="true"
  >
    <template #container="{}">
      <div class="p-8 flex flex-col w-50 dark:bg-primary bg-white rounded">
        <h3 class="text-white font-semibold">
          {{ boardStore.isEdit ? 'Update' : 'Add New' }} Board
        </h3>
        <form @submit="onSubmit" class="mt-5">
          <div class="flex flex-col gap-5">
            <div class="flex flex-col field">
              <label for="name" class="dark:text-white text-primary text-sm font-medium"
                >Board Name:</label
              >
              <InputText
                class="bg-primary text-white mt-1 h-8 placeholder:text-[#828fa340] focus:outline-none focus:shadow-none focus:outline-purple focus:border-0"
                autocomplete="off"
                placeholder="e.g. Web Design"
                name="name"
                id="name"
                v-bind="name"
                aria-describedby="name-help"
                :class="errors.name ? 'p-invalid' : 'border-[#828fa340]'"
              />
              <small class="p-error capitalize" id="text-error">{{ errors.name }}</small>
            </div>
            <div class="flex flex-col">
              <p class="text-white text-sm font-medium">Board Colums:</p>
              <div v-for="(field, idx) in fields" :key="field.key">
                <div class="flex items-center gap-3">
                  <InputText
                    class="bg-primary w-full border-[#828fa340] text-white mt-3 h-8 placeholder:text-[#828fa340] focus:outline-none focus:shadow-none focus:outline-purple focus:border-0"
                    autocomplete="off"
                    placeholder="e.g. Doing"
                    :id="field.value"
                    v-model="field.value"
                    type="text"
                  />
                  <i @click="removeList(idx)" class="pi pi-times text-white mt-3" />
                </div>
              </div>
            </div>
            <Button
              @click="push('')"
              iconClass="mx-auto"
              label="Add New Column"
              severity="success"
              class="rounded-full bg-white text-purple font-bold w-full"
            />
            <Button
              :loading="isSubmitting"
              type="submit"
              :label="boardStore.isEdit ? 'Update Board' : 'Create New Board'"
              severity="success"
              class="rounded-full bg-[#635fc7] text-white w-full font-bold"
            />
          </div>
        </form></div
    ></template>
  </Dialog>
</template>