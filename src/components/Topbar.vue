<script setup lang="ts"></script>
<template>
  <header class="flex items-center px-5">
    <div class="flex gap-4 items-center w-[20%]">
      <img class="h-6" src="../assets/svg/logo-mobile.svg" alt="" />
      <h2 class="dark:text-white text-black text-[32px] font-medium">Kanban</h2>
    </div>
    <div class="flex justify-between items-center w-full">
      <h2 class="dark:text-white text-xl font-medium">Platform Lunch</h2>
      <Button class="rounded-full text-white" type="button" label="Add a new task" />
    </div>
  </header>
</template>