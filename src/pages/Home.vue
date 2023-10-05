<script setup lang="ts">
import { ref, toRaw } from 'vue';
import { githubOauth, logOut, getSession, fetchRepos, getSessionCodeUrl, fetchFromLink } from "../api/repositories";
import Button from '../components/Button.vue';
import Navbar from '../layouts/Navbar.vue';
import Search from "../components/Search.vue";
//create store to share data through whole app
import { store } from '../api/repositories';


const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const sessionUrl = getSessionCodeUrl(clientId, clientSecret);
const logged = ref<boolean>(false);
const repos = ref<any>([]);
const reponames = ref<any>([]);
const selectedRepo = ref([]);
const selectedBranch = ref('');

//checks if session is valid
if (sessionUrl) {
    getSession(sessionUrl).then((response) => {
        if (response) {
            console.log("Logged in!");
            fetchRepos(response).then((results) => {
                repos.value = results
                console.log(results);

                toRaw(results).forEach((result: any) => {
                    reponames.value = [...reponames.value, result.name]
                })
            })

            logged.value = true
        } else if (!logged.value) {
            window.location.assign('/');
        }

    })

} else {
    console.log("Please login!");
}


const fetchRepo = async (repo: any) => {
    const url = "https://api.github.com/repos/" + repo.full_name + "/branches";
    console.log(url);

    const res = await fetchFromLink(url);
    selectedRepo.value = res;
    store.repo = res;



}

const fetchBranch = async (repo: any, branch: any) => {
    const url = "https://api.github.com/repos/" + repo.full_name + "/commits?sha=" + branch;
    console.log(url);
    const res = await fetchFromLink(url);
    console.log(res);
    return res
}


</script>

<template>
    <Navbar>
        <Button v-if=!logged @click="githubOauth(clientId)">Authenticate with Github</Button>
        <Button v-if=logged @click="logOut()"> Logout </Button>
    </Navbar>
    <Search :reponames="reponames" :repos="repos" v-if=logged></Search>
    <div class="w-5/5 flex justify-center text-left" v-for="repo in repos">
        <router-link :to="{ name: 'Repo', params: { repoId: repo.id } }">
            <div @click="fetchRepo(repo)"> {{ repo.full_name }}</div>
        </router-link>
    </div>
</template>