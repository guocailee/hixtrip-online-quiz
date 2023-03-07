<script setup lang="ts">
// import { onMounted, ref } from 'vue'
// import userApi from './api/user'
// import orgApi from './api/org'

// let user = ref<any>()
// let org = ref<any>()
// onMounted(() => {
//   userApi.query({}).then((res) => (user.value = res))
//   orgApi.query().then((res) => (org.value = res))
// })
</script>

<template>
  <!-- <div>
    {{ org }}
    {{ user }}
  </div> -->
  <router-view></router-view>
</template>

<style lang="scss" scoped>
// .logo {
//   height: 6em;
//   padding: 1.5em;
//   will-change: filter;
//   transition: filter 300ms;
// }
// .logo:hover {
//   filter: drop-shadow(0 0 2em #646cffaa);
// }
// .logo.vue:hover {
//   filter: drop-shadow(0 0 2em #42b883aa);
// }
</style>
