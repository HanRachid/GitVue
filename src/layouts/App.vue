<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from './Navbar.vue'
</script>



<template>

    <Navbar />
     <main>
        <RouterView>
            
        </RouterView>
        
     </main>
     <footer></footer>
</template>