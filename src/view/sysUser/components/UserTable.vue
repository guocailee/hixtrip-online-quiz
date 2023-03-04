<template>
    <div class="org-menu">

    </div>
</template>
    
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import userApi from '@/api/user'


let user = ref<any>()
onMounted(() => {
    userApi.query({}).then((res) => (user.value = res))
})
</script>
<style scoped></style>
    