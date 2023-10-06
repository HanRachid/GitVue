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
    console.log(commitDates.value);
    console.log(dates.value);


}
watch(store, () =>
    addCommitToDate());


</script>

<template>
    <div v-for="commitDate in   commitDates  ">
        {{ commitDate.date }}
        <div v-for="commit in commitDate.commits">
            <img class="w-10" :src="commit.author.avatar_url" alt="" srcset="">
            {{ commit.commit.message }}
        </div>
    </div>
</template>