<script setup lang="ts">
import { useBoardStore } from '@/stores/Board.store'
import ListItems from '@/components/ListItems.vue'
import { useListStore } from '@/stores/List.store'
import { useTaskStore } from '@/stores/Task.store'
import { computed, onMounted, watch } from 'vue'

const boardStore = useBoardStore()
const { getAllTasks } = useTaskStore()
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

onMounted(() => getAllTasks())
</script>
<template>
  <div class="flex gap-4 h-full" v-if="lists.length > 0">
    <ListItems v-for="list in lists" :key="list.name" :list="list" />
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