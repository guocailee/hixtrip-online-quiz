<script setup lang="ts">
import { onMounted, ref } from 'vue'
import OrgTree from './components/OrgTree.vue';
import UserTable from './components/UserTable.vue';


let pid = ref<any>(0)

const loadChildNodes = (id:Number)=> {
  pid.value = id
}
</script>

<template>
  <div>
    <div>
      <org-tree @load-child-nodes="loadChildNodes"></org-tree>
      <user-table :pid="pid"></user-table>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
