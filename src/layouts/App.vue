<script setup lang="ts">
import { RouterView } from "vue-router";
import { toRaw } from "vue";
import { store, githubOauth, logOut, getSessionCodeUrl, getSession, fetchRepos } from "../api/repositories";
import Button from "../components/Button.vue";
import Navbar from '../layouts/Navbar.vue';
import Search from "../components/Search.vue";

// const logged = ref(store.logged);

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const sessionUrl = getSessionCodeUrl(clientId, clientSecret);




//checks if session is valid
if (sessionUrl) {
   getSession(sessionUrl).then((response) => {
      if (response) {
         console.log("Logged in!");
         fetchRepos(response).then((results) => {
            store.repos = results
            console.log(results);

            toRaw(results).forEach((result: any) => {
               store.reponames = [...store.reponames, result.name]
            })
         })

         store.logged = true
         console.log(store);

      } else if (!store.logged) {
         window.location.assign('/');
      }

   })

} else {
   console.log("Please login!");
}

</script>



<template>
   <nav>
      <Navbar>
         <Button v-if=!store.logged @click="githubOauth(clientId)">Authenticate with Github</Button>
         <Button v-if=store.logged @click="logOut()"> Logout </Button>

      </Navbar>
   </nav>
   <main>
      <Search :reponames="store.reponames" :repos="store.repos" v-if=store.logged></Search>

      <RouterView>

      </RouterView>

   </main>
   <footer></footer>
</template>