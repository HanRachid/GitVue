<script setup lang="ts">
import { store } from '../api/repositories';
const fetchBranch = async (repo: any, branch: any) => {
    const url = "https://api.github.com/repos/" + repo.full_name + "/commits?sha=" + branch;
    console.log(url);
    const res = await fetchFromLink(url);
    console.log(res);
    return res
}
store.repo.forEach(element => {
    console.log(element.name + " " + element.commit.sha);

});

</script>

<template>
    <div>

    </div>
</template>