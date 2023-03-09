<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
// import userApi from "./api/user";
import orgApi from "./api/org";
import OrgTree from "./components/OrgTree.vue";
import UserTable from "./components/UserTable.vue";

// let user = ref<any>();
let org = ref<any>();
const userTableRef = ref();

let activeName = ref<string>("成员管理");
onMounted(() => {
  // userApi.query({}).then((res) => (user.value = res));
  orgApi.query().then((res) => (org.value = res));
});
const handleNodeClick = ({ data, node }) => {
  userTableRef.value.getUserData(data);
  userTableRef.value.getCurrentOrg(node);
};
</script>

<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="成员管理" name="成员管理">
        <div class="member-manage">
          <OrgTree :org="org" @node-click="handleNodeClick" />
          <UserTable ref="userTableRef" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="团队管理" name="团队管理">团队管理</el-tab-pane>
      <el-tab-pane label="职位维护" name="职位维护">职位维护</el-tab-pane>
    </el-tabs>
  </div>
  <!-- <div>
    {{ org }}
    {{ user }}
  </div> -->
</template>

<style scoped>
:deep(.el-tabs__header) {
  margin-bottom: 0;
}
:deep(.el-tab-pane) {
  height: 80vh;
  overflow: hidden;
}
.member-manage {
  display: flex;
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
