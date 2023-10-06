<script setup lang="ts">
import { store, fetchBranch } from '../api/repositories';
import Commits from "../components/Commits.vue";





function onBranchChange(e: any) {
    const branchName = e.target.value

    fetchBranch(store.repo, branchName).then((result) => {
        store.selectedCommits = result;

    })

    store.selectedBranch = e.target.value;
}
</script>

<template>
    <div>{{ store.repo.name }}</div>
    <select @change="(e) => onBranchChange(e)">
        <option v-for="branch in store.branches">{{ branch.name }}</option>
    </select>
    <Commits />
</template>