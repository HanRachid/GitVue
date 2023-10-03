<script setup lang="ts">
    import {ref} from 'vue';
    import Counter from "../components/Counter.vue";
    const count = ref(0);
    count.value = 10;
    const user = ref("rachid");

</script>

<template>

    <div>
       
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