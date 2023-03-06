<template>
  <div class="sys-user">
    <el-container>
      <el-aside width="250px" class="ory-menu-aside">
        <org-tree @orgTableCurrentChange="orgTableCurrentChange" v-model:orgBreadcrumb="orgBreadcrumb" />
      </el-aside>
      <el-main>
        <user-table ref="userTable" :orgBreadcrumb="orgBreadcrumb" />
      </el-main>
    </el-container>
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import OrgTree from './components/OrgTree.vue';
import UserTable from './components/UserTable.vue';

let orgBreadcrumb = ref<any>([]);
let userTable = ref<any>(null);
async function orgTableCurrentChange(orgId: string) {
  userTable.value.externalUpdateTable(orgId);
}


</script>

<style scoped lang="less">
@border-line: 1px #eee solid;

.ory-menu-aside {
  border-right: @border-line;
}
</style>
  