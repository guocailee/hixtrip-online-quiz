<script setup lang="ts">
import { computed, onMounted, ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import userApi from "../api/user";
const props = defineProps({
  curOrg: {},
});
let user = ref([]);
let curOrg = reactive({
  parentName: "",
  name: "",
  id: "",
});
let input = ref("");
const getUserData = (params) => {
  if (input.value) input = "";
  userApi.query({ orgId: params.id }).then((res) => (user.value = res));
};
const getCurrentOrg = (node) => {
  curOrg.parentName = node.parent.data.name;
  curOrg.name = node.data.name;
  curOrg.id = node.data.id;
};

const handleChange = (val) => {
  if (!val) {
    getUserData(curOrg);
  } else {
    user.value = user.value.filter((item) => item.id === val);
  }
};
defineExpose({
  getUserData,
  getCurrentOrg,
});
</script>
<template>
  <div class="user-table">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>{{ curOrg.parentName }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ curOrg.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="my-table">
      <div class="table-tool">
        <el-select
          v-model="input"
          clearable
          filterable
          placeholder="搜索"
          @change="handleChange"
        >
          <el-option
            v-for="item in user"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <span class="line"></span>
        <el-dropdown>
          <span class="el-dropdown-link">
            登录状态
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>已登录</el-dropdown-item>
              <el-dropdown-item>未登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <div style="margin-left: 20px">{{ user.length || 0 }} 个成员</div>
      </div>
      <el-table border :data="user" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" sortable label="姓名" />
        <el-table-column prop="nickname" sortable label="用户名" />
      </el-table>
    </div>
  </div>
</template>
<style scoped >
.user-table {
  width: calc(100% - 300px);
  height: 100%;
  border: 1px solid #e4e7ed;
  border-top: 0;
  border-left: 0;
}
.table-tool {
  height: 45px;
  display: flex;
  align-items: center;
  padding: 10px 20px;
}
.table-tool .el-input {
  width: 200px;
  border: none;
}
:deep(.el-select .el-input__wrapper) {
  box-shadow: none;
}
:deep(.el-select .el-input.is-focus .el-input__wrapper) {
  box-shadow: none !important;
}
:deep(.el-input__wrapper:hover) {
  box-shadow: none !important;
}
:deep(.el-select .el-input__wrapper.is-focus) {
  box-shadow: none !important;
}
.el-breadcrumb {
  height: 57px;
  line-height: 57px;
  padding: 0 15px;
  border-bottom: 1px solid #e4e7ed;
  box-sizing: border-box;
}
.my-table {
  height: calc(100% - 57px);
}
.el-table--border {
  height: calc(100% - 45px);
}
.line {
  display: inline-block;
  margin: 0 15px;
  width: 1px;
  height: 100%;
  background-color: #ededed;
}
</style>