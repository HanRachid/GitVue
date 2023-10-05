<script setup lang="ts">
</script>

<template>
    <button href="#"
        class="relative flex h-12 w-full mx-auto items-center justify-start px-8 before:absolute before:inset-0 before:rounded-full before:bg-white before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
        <span class="relative text-base font-semibold text-purple-600">
            <slot />
        </span>
    </button>
</template>