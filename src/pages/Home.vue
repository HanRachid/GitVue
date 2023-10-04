<script setup lang="ts">
    import {ref} from 'vue';
    import { githubOauth, logOut , getSession, fetchBranch } from "../api/repositories";
    import Button from '../components/Button.vue';
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
    const sessionToken = ref("")

    //get session token from logged user and store in state

    if (sessionToken.value === ""){
    getSession(clientId,clientSecret).then((result)=>{
            sessionToken.value = result;
            fetchBranch(sessionToken.value);
    })
    }
    
    
    
</script>

<template>

    <div>
        <Button @click="githubOauth(clientId)">Login</Button>

        <Button @click="logOut()">Logout</Button>


       
        <div>
        {{ sessionToken }}

        </div>
    </div>

</template>