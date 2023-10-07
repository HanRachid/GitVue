<script setup lang="ts">
import { RouterView } from "vue-router";
import { toRaw } from "vue";
import { store, githubOauth, logOut, getSessionCodeUrl, fetchRepos } from "../api/repositories";
import Button from "../components/Button.vue";
import Navbar from '../layouts/Navbar.vue';
import Search from "../components/Search.vue";
import gitLogo from "../assets/Git-Icon-Black.svg";
import vueLogo from "../assets/vue.svg";
import { router } from '../main';



getSessionCodeUrl().then((session) => {


   if (session) {
      router.push({ name: "Home", params: { accessCode: store.accessCode } });

      store.logged = true
      fetchRepos(session).then((results) => {
         store.repos = results

         toRaw(results).forEach((result: any) => {
            store.reponames = [...store.reponames, result.name]
         })

      })


   }
});





</script>



<template>
   <nav class="px-32 flex-col">
      <Navbar>
         <router-link class="flex" v-if=store.logged :to="{ name: 'Home', params: { accessCode: store.accessCode } }">
            <img :src="gitLogo" class="w-12">
            <img :src="vueLogo" class="w-12">
         </router-link>
         <Button v-if=!store.logged @click="githubOauth()">Authenticate with Github</Button>
         <Button v-if=store.logged @click="logOut()"> Logout </Button>

      </Navbar>
   </nav>
   <main class="px-32 flex-col">
      <Search :reponames="store.reponames" :repos="store.repos" v-if=store.logged></Search>

      <RouterView>

      </RouterView>


   </main>
</template>