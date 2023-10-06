<script setup lang="ts">
import { ref, computed } from 'vue';
import matchRepos from "../helpers/closestMatch";
import { store } from '../api/repositories';

let id = 0;

const search = ref("");
const computedResults = computed(() => {
    id = 0;
    const result: { element: string, id: number, url: string }[] = []
    matchRepos(search.value, store.reponames).forEach((element) => {
        const resultrepo: any = store.repos?.find((repo: any) => repo.name === element);
        result.push({ element: element, id: id++, url: resultrepo.url })
    })

    return result;
})

function setRepo(name: string) {
    for (let i in store.repos) {
        if (store.repos[i].name === name) {
            store.repo = store.repos[i]

        }

    }

}



</script>

<template>
    <div class="w-5/5 flex items-center content-center justify-start">
        <form class="w-2/5">
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input v-model="search"
                    class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="Search repos" required />
                <button type="submit"
                    class="text-white absolute right-2.5 bottom-2.5 bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2">
                    <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </button>
            </div>
            <div v-for="result in computedResults" id="suggestion">
                <div v-if="search.length !== 0" class="cursor-pointer py-2 px-3 hover:bg-slate-100" :key="id">
                    <p @click="setRepo(result.element)" class="text-sm font-medium text-gray-600">{{ result.element }}</p>
                </div>


            </div>

            <div v-if="search.length > 0 && computedResults.length == 0" class="cursor-default   py-2 px-3 ">
                <p class="text-sm font-medium text-gray-600">No match</p>
            </div>

        </form>
    </div>
</template>