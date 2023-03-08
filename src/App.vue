<script setup lang="ts">
import type { TabsPaneContext } from "element-plus";
import OrgTree from "./components/OrgTree.vue";
import UserTable from "./components/UserTable.vue";

let activeName = ref<string>("User");
let orgId = ref<string>('');

const handleClick = (tab: TabsPaneContext, event: Event) => { };
const handleNodeClick = (id: string) => {
  orgId.value = id
};
</script>

<template>
  <div class="container">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="成员管理" name="User">
        <el-container>
          <el-aside width="300px">
            <org-tree @node-click="handleNodeClick" />
          </el-aside>
          <el-main>
            <user-table :org-id="orgId" />
          </el-main>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="团队管理" name="Team">团队管理</el-tab-pane>
      <el-tab-pane label="职位维护" name="Posts">职位维护</el-tab-pane>
    </el-tabs>
  </div>
  <div>
    <!-- {{ org }} -->
    <!-- {{ user }} -->
  </div>
</template>

<style scoped>
.container {
  height: 6 00px;
  border: 1px solid #dcdfe6;
}

:deep(.el-tabs__header) {
  margin-bottom: 0;
}

:deep(.el-aside) {
  border-right: 1px solid #dcdfe6;
}

:deep(.el-main) {
  padding: 0;
}
</style>
