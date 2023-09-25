<script setup lang="ts">
import { onMounted, ref } from 'vue'
import userApi from './api/user'
import orgApi from './api/org'
import OrgTree from './components/OrgTree.vue'
import UserTable from './components/UserTable.vue'
import type { TabsPaneContext } from 'element-plus'
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const activeName = ref('first')
let user = ref<any>()
let org = ref<any>()
let titleName=ref<any>()
onMounted(() => {
  userApi.query({}).then((res) => (user.value = res))
  orgApi.query().then((res) => {
  org.value = res.map(item => ({
            id: item.id,
            label: item.name,
        }))
    titleName.value= org.value[0].label;
  })
})
const getTitle=(val:any)=>{
  titleName.value=val.label;
   userApi.query({}).then((res) => (user.value = res))
}
</script>

<template>
  <div>
     <el-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
    @tab-click="handleClick"
  >
    <el-tab-pane class="mb-0" label="成员管理" name="first">
      <div class="flex ">
        <OrgTree :data-source="org" @get-title="getTitle" class="w-3/10"></OrgTree>
        <div class="border border-t-0 w-7/10">
            <el-breadcrumb class="p-2" >
            <el-breadcrumb-item >{{ titleName }}</el-breadcrumb-item>
          </el-breadcrumb>
          <UserTable :user="user"></UserTable>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="团队管理" name="second">团队管理</el-tab-pane>
    <el-tab-pane label="职位维护" name="third">职位维护</el-tab-pane>
  </el-tabs>
  </div>
</template>

<style scoped>
.w30{
  width: 30%;
}
.demo-tabs{
  width: 50vw;
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
/deep/.el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 0 0px;
}
</style>
