<template>
  <div>
    <KeepAlive>
      <el-tabs v-model="activeName" class="main-tabs">
        <el-tab-pane label="成员管理" name="user">
          <sys-user />
        </el-tab-pane>
        <el-tab-pane label="团队管理" name="org">团队管理</el-tab-pane>
        <el-tab-pane label="职务维护" name="position">职务维护</el-tab-pane>
      </el-tabs>
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import SysUser from '@/view/sysUser/index.vue'
let activeName = ref<string>('user');


</script>

<style scoped lang="less"></style>

<style>
.el-tabs__header {
  margin: 0 5px;
}

.el-main {
  --el-main-padding: 0;
}
</style>
