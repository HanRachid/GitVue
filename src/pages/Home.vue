<script setup lang="ts">
import { ref, toRaw } from 'vue';
import { githubOauth, logOut, getSession, fetchBranch, getSessionCodeUrl } from "../api/repositories";
import Button from '../components/Button.vue';
import Navbar from '../layouts/Navbar.vue';
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const sessionUrl = getSessionCodeUrl(clientId, clientSecret);
const logged = ref<boolean>(false);
const repos = ref<any>([]);

//checks if session is valid
if (sessionUrl) {
    getSession(sessionUrl).then((response) => {
        if (response) {
            console.log("Logged in!");
            fetchBranch(response).then((result) => {
                repos.value = toRaw(result);
                console.log(repos.value);

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
    <div>
        <Navbar>
            <Button v-if=!logged @click="githubOauth(clientId)">Login</Button>
            <Button v-if=logged @click="logOut()"> Logout </Button>
        </Navbar>

        <div v-for="repo in repos" class="flex gap-10">
            <div>{{ repo.name }}</div>
            <div> {{ repo.url }}</div>
        </div>
        <div>

        </div>
    </div>
</template>