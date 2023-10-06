<script setup lang="ts">
import { store } from "../api/repositories";


</script>

<template>
    <div v-for="commit in store.selectedCommits">
        <div>{{ commit.commit.author.date.split("T")[0] }} {{ commit.commit.message }}</div>

    </div>
</template>