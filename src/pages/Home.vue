<script setup lang="ts">
    import {ref} from 'vue';
    import Counter from "../components/Counter.vue";
    import { githubOauth, logOut } from "../api/repositories";

    const count = ref(0);
    count.value = 10;
    const user = ref("rachid");
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
    const redirectUri = '/';
    const token = import.meta.env.VITE_TOKEN;
    console.log(clientId);
    
</script>

<template>

    <div>
        <button @click="githubOauth(clientId)">Login</button>

        <button @click="logOut()">Logout</button>


        <div>
            <Counter v-model:count="count" 
                @increment:count="count++" 
                @decrement:count="count--"
                v-model:user="user"
            />
        </div>
        <div>
        </div>
    </div>

</template>