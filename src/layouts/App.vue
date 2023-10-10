<script setup lang="ts">
import {RouterView} from 'vue-router';
import {toRaw} from 'vue';
import {store, githubOauth, logOut, getSessionCodeUrl, fetchRepos} from '../api/repositories';
import ButtonComponent from '../components/ButtonComponent.vue';
import NavbarLayout from './NavbarLayout.vue';
import SearchComponent from '../components/SearchComponent.vue';
import gitLogo from '../assets/Git-Icon-Black.svg';
import vueLogo from '../assets/vue.svg';
import {router} from '../main';
import {Repo, User} from '../types';
const baseUrl = '/rachid_handaoui-taas-frontend-challenge/';

getSessionCodeUrl().then(session => {
	if (session) {
		store.logged = true;
		fetchRepos(session, '/repos').then(results => {
			store.repos = results as Repo[];

			toRaw(results).forEach((result: object) => {
				store.reponames.push((result as Repo).name);
			});
			fetchRepos(session, '').then((userResult: object) => {
				store.user = userResult as User;

				router.push({name: 'Home', params: {user: store.user?.login}});
			});
		});
	} else if (window.location.pathname !== baseUrl) {
		window.location.assign(baseUrl);
	}
});
</script>
<template>
  <nav class="px-32 flex-col">
    <NavbarLayout>
      <router-link
        v-if="store.user"
        class="flex"
        :to="{ name: 'Home', params:{user: store.user.login}} "
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
      <div
        class="flex gap-5 justify-center items-center"
        v-if="store.user"
      >
        <img
          :src="store.user.avatar_url"
          class="w-8"
        >
        <p class="text-stone-900 text-2xl font-bold ">
          {{ store.user.login }}
        </p>
      </div>
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
