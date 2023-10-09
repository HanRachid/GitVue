<script setup lang="ts">
import { ref, computed } from 'vue';
import matchRepos from "../helpers/closestMatch";
import { fetchRepo, store } from '../api/repositories';
import { router } from "../main";
import { Repo } from '../types';

let id = 0;
const search = ref("");
const computedResults = computed(() => {
  id = 0;
  const result: { element: string, id: number, url: string; }[] = [];
  matchRepos(search.value, store.reponames).forEach((element: string) => {
    const resultrepo = store.repos?.find((repo: Repo) => repo.name === element);
    result.push({ element: element, id: id++, url: resultrepo!.url });
  });

  return result;
});

function setRepo(name: string) {

  for (const i in store.repos) {
    if (store.repos[i].name === name) {
      store.repo = store.repos[i];
    }
  }
  search.value = "";
  fetchRepo(store.repo, store.repo.default_branch).then(() => {
    router.push({ name: 'Repo', params: { repoId: store.repo.id, accessCode: store.accessCode } });
  });
}
</script>

<template>
  <div class="w-5/5 flex items-center content-center justify-start p-5 pl-42 ml-">
    <label
      for="default-search"
      class="mb-2 text-sm font-medium text-gray-900 sr-only"
    >Search</label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          class="w-4 h-4 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        v-model="search"
        class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
        placeholder="Search repos"
        required
      >
    </div>
    <div
      v-for="result in computedResults"
      id="suggestion"
      :key="result.id"
    >
      <div
        v-if="search.length !== 0"
        :key="id"
        class="cursor-pointer py-2 px-3 hover:bg-slate-100"
      >
        <p
          class="text-sm font-medium text-gray-600"
          @click="setRepo(result.element)"
        >
          {{ result.element }}
        </p>
      </div>
    </div>

    <div
      v-if="search.length > 0 && computedResults.length == 0"
      class="cursor-default   py-2 px-3 "
    >
      <p class="text-sm font-medium text-gray-600">
        No match
      </p>
    </div>
  </div>
</template>