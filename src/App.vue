
<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="成员管理" name="1">
        <el-container>
          <el-aside width="200px">
            <org-tree @getTreeData="getTreeData"></org-tree>
          </el-aside>
          <el-main>
            <user-table ref="refUserTable"></user-table>
          </el-main>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="团队管理" name="2"></el-tab-pane>
      <el-tab-pane label="职位维护" name="3"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import OrgTree from './components/OrgTree/index.vue'
import UserTable from './components/UserTable/index.vue'

const activeName = ref('1')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const refUserTable = ref();
const getTreeData = (data: any) => {
  // console.log(data)
  refUserTable.value.setTreeItemData(data);
}
</script>
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
