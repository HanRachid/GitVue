<script setup lang="ts">
import { getAccessCode, fetchRepo } from "../api/repositories";
import Repos from "../components/Repos.vue";
//create store to share data through whole app
import { store } from '../api/repositories';


</script>

<template>
    <div class="" v-for="repo in store.repos">

        <router-link @click="fetchRepo(repo, repo.default_branch)"
            :to="{ name: 'Repo', params: { repoId: repo.id, accessCode: getAccessCode() } }">

            <Repos :name="repo.name" :full_name="repo.full_name" :default_branch="repo.default_branch">
            </Repos>
        </router-link>

    </div>
</template>