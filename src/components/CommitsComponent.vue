<script setup lang="ts">
import {store} from '../api/repositories';
import {ref, watch} from 'vue';
import {Repo} from '../types';

const commitDates = ref<{ date: string, commits: Repo[]; }[]>([]);
const dates = ref<string[]>([]);

function timeSince(date: string) {
	const seconds = Math.floor(((new Date().getTime() / 1000) - (new Date(date).getTime() / 1000)));
	let interval = seconds / 31536000;
	if (interval > 1) {
		return Math.floor(interval) + ' year' + (Math.floor(interval) === 1 ? '' : 's');
	}

	interval = seconds / 2592000;
	if (interval > 1) {
		return Math.floor(interval) + ' month' + (Math.floor(interval) === 1 ? '' : 's');
	}

	interval = seconds / 86400;
	if (interval > 1) {
		return Math.floor(interval) + ' day' + (Math.floor(interval) === 1 ? '' : 's');
	}

	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) + ' hour' + (Math.floor(interval) === 1 ? '' : 's');
	}

	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + ' minute' + (Math.floor(interval) === 1 ? '' : 's');
	}

	return Math.floor(seconds) + ' second' + (Math.floor(interval) === 1 ? '' : 's');
}

const addCommitToDate = () => {
	dates.value = [];
	commitDates.value = [];
	store.selectedCommits.forEach((commit: Repo) => {
		const commitDate = commit.commit.author.date.split('T')[0];
		if (dates.value.includes(commitDate)) {
			commitDates.value.forEach(commitData => {
				if (commitData.date === commitDate) {
					commitData.commits.push(commit);
				}
			});
		} else {
			dates.value.push(commitDate);
			commitDates.value.push({date: commitDate, commits: [commit]});
		}
	});
};

watch(store, () =>
	addCommitToDate());
</script>

<template>
  <div
    v-for="commitDate in commitDates "
    :key="commitDate.date"
    class="container mt-4 mx-auto"
  >
    <span class="text-xl text-teal-800 font-mono bg-teal-100 inline rounded-full px-2 align-top  ">
      {{ commitDate.date }}</span>
    <div
      v-for="commit in commitDate.commits"
      :key="commit.id"
      class="flex items-center justify-between gap-6 card m-2 cursor-default border border-gray-400 rounded-lg   transform p-3 "
    >
      <div class="flex gap-3 justify-center items-center">
        <img
          class="text-lg  w-10"
          :src="commit.author.avatar_url"
          alt=""
          srcset=""
        >
        <p class="font-mono text-lg  font-medium text-slate-900 ">
          {{ commit.commit.message }}
        </p>
      </div>

      <p class="font-mono text-sm  font-medium text-slate-900 ">
        {{ (timeSince(commit.commit.author.date)) }}
      </p>
    </div>
  </div>
</template>
