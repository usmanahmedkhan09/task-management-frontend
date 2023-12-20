<script setup lang="ts">
import { useBoardStore } from '@/stores/Board.store'

import { useListStore } from '@/stores/List.store'
import { computed, onMounted, watch } from 'vue'

const boardStore = useBoardStore()
const { toggleBoard } = boardStore

const lists = computed(() => {
  return listStore.lists
})
const listStore = useListStore()

watch(
  () => boardStore.board._id,
  () => {
    listStore.getBoardLists(boardStore.board._id)
  }
)
</script>
<template>
  <div class="flex gap-4 h-full" v-if="lists.length > 0">
    <div class="min-w-[280px] h-auto" v-for="list in lists" :key="list.name">
      <p class="mb-4 text-[#828fa3] text-sm font-medium capitalize">{{ list.name }} (0)</p>
      <div class="overflow-x-auto h-full">
        <div class="rounded-lg mb-5 px-5 py-4 w-[280px] bg-primary" v-for="x in 100" :key="x">
          <p class="text-white font-medium text-sm">
            Review early feedback and plan next steps for roadmap
          </p>
          <p class="text-[#828fa3] text-xs">0 of 2 subtask</p>
        </div>
      </div>
    </div>
    <div
      class="h-screen my-8 flex items-center min-w-[280px] rounded-lg bg-primary justify-center cursor-pointer"
      @click="toggleBoard(true)"
    >
      <h2 class="text-[#828fa3] text-2xl">
        <i class="pi pi-plus text-[#828fa3] mt-3" />
        New Column
      </h2>
    </div>
  </div>
  <div v-else class="h-full flex flex-col justify-center items-center">
    <p class="text-[#828fa3] font-semibold text-2xl">
      This board is empty. Create a new column to get started.
    </p>
    <Button
      @click="toggleBoard(true)"
      label="Create New Column"
      severity="success"
      class="rounded-full bg-white text-purple w-full font-bold max-w-[200px] mt-5"
    />
  </div>
</template>