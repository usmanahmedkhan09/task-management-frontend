<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useBoardStore } from '@/stores/Board.store'
import BoardComponent from '@/components/Board.vue'

const boardStore = useBoardStore()
const { getAllBoards, toggleBoard, selectedBoard, board } = boardStore

const boards = computed(() => {
  return boardStore.boards
})

onMounted(async () => {
  await getAllBoards()
})
</script>
<template>
  <div class="pt-10 flex gap-5 flex-col overflow-auto">
    <h3 class="font-semibold text-sm uppercase text-gary px-5">All boards ({{ boards.length }})</h3>
    <div class="">
      <ul class="w-full list-none p-0 text-purple cursor-pointer">
        <li
          v-for="item in boards"
          class="text-[#828fa3] hover:text-purple capitalize px-4 flex items-center gap-2 font-semibold py-4 hover:bg-white rounded-r-full w-[250px]"
          :key="item.name"
          @click="selectedBoard(item._id)"
          :class="{ 'bg-white': item._id == boardStore.board._id }"
        >
          <img src="../assets/svg/icon-board.svg" alt="" />
          {{ item.name }}
        </li>
        <li
          @click="toggleBoard(false)"
          class="px-4 flex items-center gap-2 font-semibold py-4 hover:bg-white rounded-r-full w-[250px]"
        >
          <img src="../assets/svg/icon-board.svg" alt="" />
          <span class="pi pi-plus font-bold text-sm"></span>
          Create New Board
        </li>
      </ul>
    </div>
    <BoardComponent />
  </div>
</template>