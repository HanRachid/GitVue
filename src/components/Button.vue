<script setup lang="ts">
</script>

<template>
    <button @click="console.log('clicked')" class="px-3 py-1 border shadow rounded">
        <slot />
    </button>
    
</template>