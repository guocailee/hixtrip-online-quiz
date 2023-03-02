<!--
 * @Author: suxunying
 * @Date: 2023-03-02 22:53:36
 * @LastEditors: suxunying
 * @LastEditTime: 2023-03-03 00:44:44
 * @FilePath: \hixtrip-online-quiz\src\views\home\Home.vue
 * @Description: 
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Menu from './components/Menu.vue';
import UserTable from './components/UserTable.vue'
import userApi, { User } from '../../api/user'
import orgApi, { Org } from '../../api/org'

let user = ref<User[]>()
let org = ref<Org[]>()
let currentORG = ref('')
let loading = ref(false)

/**
 * 获取部门信息
 */
async function getOrganization() {
  
  return new Promise((resolve, reject) => {
    orgApi.query(currentORG.value).then((res) => {
      if (!org.value) {
        org.value = res
      } else {
        find(org.value, currentORG.value, res)
      }
      resolve(res)
    })

    const find = (list: Org[], id: string, data: Org[]) => {
      list.forEach(item => {
        if (item.id !== id) {
          if (item.child) {
            find(item.child, id, data)
          }
        } else {
          if (!item.child) {
            console.log('push')
            item.child = data
          }
        }
      })
    }
  });
}

/**
 * 获取用户信息
 */
async function getUser() {

}

/**
 * 发起搜索
 */
async function handleSearch(key: string) {
  
  
}

/**
 * 点击部门节点
 */
async function handleClick(id: string) {
  console.log('handleClick')
  currentORG.value = id
  await getOrganization()
}

onMounted(async () => {
  await userApi.query({}).then((res) => (user.value = res))
  await orgApi.query().then((res) => (org.value = res))
})
</script>

<template>
  <div class="layout">
    <div class="menu">
      <Menu :org="org" @handleClick="handleClick"></Menu>
    </div>
    <div class="table">
      <UserTable :user="user" @handleSearch="handleSearch"></UserTable>
    </div>
    <div class="mask" v-show="loading">
      <div>Loading</div>
    </div>
  </div>
</template>

<style scoped>
.layout {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 500px;
}
.menu {
    min-width: 30%;
    height: 100%;
    border-right: 1px solid #000;
}
.table {
  min-width: 60%;
  height: 100%;
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0, 0.6);
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
