<script setup lang="ts">
// eslint-disable-next-line vue/require-default-prop, vue/prop-name-casing
const props = defineProps({ name: String, full_name: String, default_branch: String })
</script>

<template>
  <div class="container mt-4 mx-auto">
    <div class="">
      <div
        class="card m-2 cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200"
      >
        <div class="m-3">
          <h2 class="text-lg mb-2">
            {{ props.name }}
            <span
              class="text-sm text-teal-800 font-mono bg-teal-100 inline rounded-full px-2 align-top float-right animate-pulse"
            >{{
              default_branch }}</span>
          </h2>
          <p class="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">
            {{ props.full_name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>