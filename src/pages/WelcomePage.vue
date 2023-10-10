<script setup lang="ts">
import {store} from '../api/repositories';
import gitIcon from '../assets/git.png';
</script>

<template>
  <section
    v-if="!store.logged"
    class="h-full bg-gradient-to-br from-blue-900 to-purple-600 md:bg-gradient-to-r"
  >
    <div class="grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 h-full">
      <div class="place-self-center mr-auto lg:col-span-7">
        <h1 class="mb-4 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
          GitVue
        </h1>
        <p class="mb-6 max-w-2xl font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          GitVue provides a user-friendly interface that allows you to effortlessly browse through your
          repositories and branches
        </p>
      </div>
      <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img :src="gitIcon">
      </div>
    </div>
  </section>
</template>
