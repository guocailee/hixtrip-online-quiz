<script setup lang="ts">
import { onMounted, ref } from "vue"
import userApi from "./api/user"
import orgApi from "./api/org"
import OrgTree from "./components/OrgTree.vue"
import UserTable from "./components/UserTable.vue"
let user = ref<any>()
let org = ref<any>()
const userTable: any = ref(null)
onMounted(() => {
  userApi.query({}).then((res) => (user.value = res))
  orgApi.query().then((res) => (org.value = res))
})
const nodeClickHandle = (pid: string) => {
  userTable.value.loadUsers(pid)
}
</script>

<template>
  <div class="layout">
    <!-- {{ org }} -->
    <!-- {{ user }} -->
    <OrgTree :pid="''" @node-click="nodeClickHandle"></OrgTree>
    <UserTable ref="userTable"></UserTable>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: row;
  height: 100%;
}
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
