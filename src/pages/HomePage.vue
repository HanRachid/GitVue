<script setup lang="ts">
import {fetchRepo} from '../api/repositories';
import ReposComponent from '../components/ReposComponent.vue';
// Create store to share data through whole app
import {store} from '../api/repositories';
import {ref, watch} from 'vue';

const repos = ref(store.repos);

watch(store, () => {
	repos.value = store.repos;
});
</script>

<template>
  <div
    v-for="repo in repos"
    :key="repo.id"
    class=""
  >
    <router-link
      :to="{ name: 'Repo', params: { repoId: repo.name, user: store.user!.login } }"
      @click="fetchRepo(repo, repo.default_branch)"
    >
      <ReposComponent
        :name="repo.name"
        :full-name="repo.full_name"
        :default-branch="repo.default_branch"
      />
    </router-link>
  </div>
</template>
