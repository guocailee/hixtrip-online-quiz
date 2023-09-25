<script setup lang="ts">
import { onMounted, reactive, ref, } from 'vue'
import userApi from './api/user'
import UserTable from './components/UserTable.vue'
import OrgTree from './components/OrgTree.vue'


let user = ref<any>()
let org = ref<any>()
let breadList = ref([])
let activeName = ref('numbers')
let params = reactive({})
const getUser = () => {
  userApi.query({ ...params }).then((res) => (user.value = res))
}
// 处理部门选择
const handleSelectOrg = (data) => {
  if (breadList.value.length > data.level) {
    breadList.value.splice(data.level, );
    breadList.value.push(data.name)
  } else {
    breadList.value.push(data.name)
  }
  params.orgId = data.id;
  getUser();
}
// 名称搜索
const handleNameSearch = (data) => {
  params.name = data;
  getUser();
}
onMounted(() => {
  getUser()
})
</script>

<template>
  <div>
    <el-tabs
      v-model="activeName"
      class="demoTabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="成员管理" name="numbers">
        <div class="numbersWrap">
          <OrgTree @onSelectOrg="handleSelectOrg"></OrgTree>
          <div class="tableWrap">
            <el-breadcrumb separator="/" class="bread">
              <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{ item }}</el-breadcrumb-item>
            </el-breadcrumb>
            <UserTable :list="user" @onNameSearch="handleNameSearch"></UserTable>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="团队管理" name="team"></el-tab-pane>
      <el-tab-pane label="职位维护" name="pisition"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.demoTabs {
  width: 1200px;
  height: 800px;
  overflow: scroll;
}
.numbersWrap {
  display: flex;
}
.tableWrap {
  padding: 10px;
  width: 100%;
}
.bread {
  margin-bottom: 10px;
}
</style>
