<script setup lang="ts">
import { fetchBranch, fetchFromLink, getAccessCode } from "../api/repositories";
//create store to share data through whole app
import { store } from '../api/repositories';




console.log(store);



const fetchRepo = async (repo: any) => {
    const url = "https://api.github.com/repos/" + repo.full_name + "/branches";
    console.log(url);

    const res = await fetchFromLink(url);
    store.repo = repo;
    store.selectedBranch = res[0];
    const sha = store.selectedBranch.commit.sha
    fetchBranch(repo, sha).then(result => { store.selectedCommits = result });
    store.branches = res;
}




</script>

<template>
    <!--  <Navbar>
        <Button v-if=!logged @click="githubOauth(clientId)">Authenticate with Github</Button>
        <Button v-if=logged @click="logOut()"> Logout </Button>
    </Navbar> -->
    <div class="w-5/5 flex justify-center text-left" v-for="repo in store.repos">

        <div @click="fetchRepo(repo)"> <router-link
                :to="{ name: 'Repo', params: { repoId: repo.id, accessCode: getAccessCode() } }">
                {{ repo.full_name }}
            </router-link></div>

    </div>
</template>