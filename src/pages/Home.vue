<script setup lang="ts">
import { ref, toRaw } from 'vue';
import { githubOauth, logOut, getSession, fetchRepos, getSessionCodeUrl } from "../api/repositories";
import Button from '../components/Button.vue';
import Navbar from '../layouts/Navbar.vue';
import Search from "../components/Search.vue";

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const sessionUrl = getSessionCodeUrl(clientId, clientSecret);
const logged = ref<boolean>(false);
const repos = ref<any>([]);
const reponames = ref<any>([]);

//checks if session is valid
if (sessionUrl) {
    getSession(sessionUrl).then((response) => {
        if (response) {
            console.log("Logged in!");
            fetchRepos(response).then((results) => {
                repos.value = results

                toRaw(results).forEach((result: any) => {
                    reponames.value = [...reponames.value, result.name]
                })
            })

            logged.value = true
        } else {
            window.location.assign('/');
        }

    })

} else {
    console.log("Please login!");
}





</script>

<template>
    <Navbar>
        <Button v-if=!logged @click="githubOauth(clientId)">Authenticate with Github</Button>
        <Button v-if=logged @click="logOut()"> Logout </Button>
    </Navbar>
    <Search :reponames="reponames" :repos="repos" v-if=logged></Search>
</template>