<script setup lang="ts">
    import {ref} from 'vue';
    import { githubOauth, logOut , getSession, fetchBranch,getSessionCodeUrl } from "../api/repositories";
    import Button from '../components/Button.vue';
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
    const sessionUrl = getSessionCodeUrl(clientId,clientSecret);
    if (sessionUrl){
        getSession(sessionUrl).then((response)=>{
            if (response){
                console.log("Logged in!");
            }else{
                window.location.assign('/');
            }
            
        })       
        
    }else{
        console.log("Please login!");
    }
    

    
    
    
</script>

<template>

    <div>
        <Button @click="githubOauth(clientId)">Login</Button>

        <Button @click="logOut()">Logout</Button>


       
        <div>

        </div>
    </div>

</template>