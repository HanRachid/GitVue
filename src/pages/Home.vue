<script setup lang="ts">
import { ref } from 'vue';
import { githubOauth, logOut, getSession, fetchBranch, getSessionCodeUrl } from "../api/repositories";
import Button from '../components/Button.vue';
import Test from "../components/Test.vue";
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const sessionUrl = getSessionCodeUrl(clientId, clientSecret);
const logged = ref(false);
if (sessionUrl) {
    getSession(sessionUrl).then((response) => {
        if (response) {
            console.log("Logged in!");
            fetchBranch(response).then((result) => {
                return result

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
        <Button v-if=!logged @click="githubOauth(clientId)">Login</Button>

        <Button v-if=logged @click="logOut()">Logout</Button>
        <Test />

        <div>

        </div>
    </div>
</template>