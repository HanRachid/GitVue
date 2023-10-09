<script setup lang="ts">
import { RouterView } from "vue-router";
import { toRaw } from "vue";
import { store, githubOauth, logOut, getSessionCodeUrl, fetchRepos } from "../api/repositories";
import ButtonComponent from "../components/ButtonComponent.vue";
import NavbarLayout from './NavbarLayout.vue';
import SearchComponent from "../components/SearchComponent.vue";
import gitLogo from "../assets/Git-Icon-Black.svg";
import vueLogo from "../assets/vue.svg";
import { router } from '../main';
import { Repo } from '../types';

getSessionCodeUrl().then((session) => {
   if (session) {
      store.logged = true
      fetchRepos(session).then((results) => {
         store.repos = results as Repo[]
         toRaw(results).forEach((result: object) => {
            store.reponames.push((result as Repo).name)
         })
         router.push({ name: "Home", params: { accessCode: store.accessCode } });
      })
   }
});
</script>
<template>
  <nav class="px-32 flex-col">
    <NavbarLayout>
      <router-link
        v-if="store.logged"
        class="flex"
        :to="{ name: 'Home', params: { accessCode: store.accessCode } }"
      >
        <img
          :src="gitLogo"
          class="w-12"
        >
        <img
          :src="vueLogo"
          class="w-12"
        >
      </router-link>
      <ButtonComponent
        v-if="!store.logged"
        @click="githubOauth()"
      >
        Authenticate with Github
      </ButtonComponent>
      <ButtonComponent
        v-if="store.logged"
        @click="logOut()"
      >
        Logout
      </ButtonComponent>
    </NavbarLayout>
  </nav>
  <main class="px-32 flex-col">
    <SearchComponent
      v-if="store.logged"
      :reponames="store.reponames"
      :repos="store.repos"
    />

    <RouterView />
  </main>
</template>