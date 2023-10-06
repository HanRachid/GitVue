<script setup lang="ts">
import { store, fetchBranch } from '../api/repositories';
import Commits from "../components/Commits.vue";


function onBranchChange(e: any) {
    const branchName = e.target.value
    store.selectedCommits = [];
    fetchBranch(store.repo, branchName).then((result) => {
        store.selectedCommits = result;

    })

    store.selectedBranch = e.target.value;
}

console.log(store);

</script>

<template >
    <div>

        <div class="flex justify-center font-bold text-slate-800 text-3xl p-5">{{ store.repo.name }}</div>
        <div class="flex items-center gap-2 card m-8 cursor-default  rounded-lg   transform p-3">
            <img src="../assets/git-branch-outline.svg" class="w-6" alt="">
            <select
                class="container   bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-4"
                v-model="store.repo.default_branch" @change="(e) => onBranchChange(e)">
                <option v-for="branch in store.branches">{{ branch.name }}</option>
            </select>


        </div>
    </div>


    <Commits />
</template>