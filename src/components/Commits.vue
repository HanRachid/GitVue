<script setup lang="ts">
import { store } from "../api/repositories";
import { ref, watch } from "vue";

const commitDates = ref<{ date: string, commits: any[] }[]>([]);
const dates = ref<string[]>([]);
function addCommitToDate() {
    dates.value = [],
        commitDates.value = [],
        store.selectedCommits.forEach((commit: any) => {
            const commitDate = commit.commit.author.date.split('T')[0];
            if (dates.value.includes(commitDate)) {
                commitDates.value.forEach((commitData) => {
                    if (commitData.date === commitDate) {
                        commitData.commits.push(commit);
                    }
                })
            } else {
                dates.value.push(commitDate);
                commitDates.value.push({ date: commitDate, commits: [commit] })
            }

        })


}
watch(store, () =>
    addCommitToDate());


</script>

<template>
    <div class="container mt-4 mx-auto" v-for="commitDate in   commitDates  ">
        <span class="text-xl text-teal-800 font-mono bg-teal-100 inline rounded-full px-2 align-top  animate-pulse">
            {{ commitDate.date }}</span>
        <div class="flex items-center justify-start gap-6 card m-2 cursor-default border border-gray-400 rounded-lg   transform p-3 "
            v-for="commit in commitDate.commits">
            <img class="text-lg mb-2 w-6" :src="commit.author.avatar_url" alt="" srcset="">
            <p class="font-mono text-lg  font-medium text-slate-900 ">
                {{ commit.commit.message }}</p>
        </div>
    </div>
</template>