<script setup lang="ts">
    defineProps<{
        count:number
        user:string
    }>()

    defineEmits(["increment:count","decrement:count","update:user"]);
    

    
</script>

<template>
        <div class="flex space-x-2">
          <!--   <Button  @click="$emit('increment:count')">+</Button>
             <Button @click="$emit('decrement:count')">-</Button>
             {{ count }}
             <input :value="user" @input="$emit('update:user',($event.target as HTMLInputElement).value)">
                {{ user }} -->
            </div>

</template>            

