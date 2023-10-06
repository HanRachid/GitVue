<script setup lang="ts">
import { getAccessCode, fetchRepo } from "../api/repositories";
//create store to share data through whole app
import { store } from '../api/repositories';
console.log(store);


</script>

<template>
    <div class="w-5/5 flex justify-center text-left" v-for="repo in store.repos">

        <div @click="fetchRepo(repo)"> <router-link
                :to="{ name: 'Repo', params: { repoId: repo.id, accessCode: getAccessCode() } }">
                {{ repo.full_name }}
            </router-link></div>

    </div>
</template>