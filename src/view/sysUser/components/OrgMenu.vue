<template>
    <div class="org-menu">

    </div>
</template>
    
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import userApi from '@/api/user'
import orgApi from '@/api/org'

let org = ref<any>()
onMounted(() => {
    orgApi.query().then((res) => (org.value = res))
})
</script>
<style scoped></style>
    