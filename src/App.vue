<script setup lang="ts">
import OrgTree from "./components/orgTree.vue";
import UserTable from "./components/userTable.vue";

import { onMounted, ref, reactive } from "vue";
import userApi from "./api/user";
import orgApi from "./api/org";

interface ListCell {
  id: string;
  name: string;
}

let user = ref<any>();
let org = ref<any>();

onMounted(() => {
  // userApi.query({}).then((res) => (user.value = res));
  orgApi.query().then((res) => (org.value = res));
});

const treeData = reactive<any>({
  key: "",
  change: (item: ListCell) => {
    // 调用userTable组件方法
    userTableRef.value.getData();
  },
});

const userTableRef = ref<any>();
function tableChange(val: string) {
  userApi.query({ orgId: treeData.id }).then((res) => {
    user.value = res?.filter((item: ListCell) => item.name.indexOf(val) > -1 || item.id.indexOf(val) > -1) ?? "";
  });
}
</script>

<template>
  <div class="content">
    <OrgTree v-model="treeData.key" :list="org" @onChange="treeData.change"></OrgTree>
    <UserTable ref="userTableRef" :list="user" @onChange="tableChange"></UserTable>
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

.content {
  display: flex;
  align-items: flex-start;
}
</style>
