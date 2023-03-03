<!--
 * @Author: suxunying
 * @Date: 2023-03-02 22:53:36
 * @LastEditors: suxunying
 * @LastEditTime: 2023-03-03 15:55:34
 * @FilePath: \hixtrip-online-quiz\src\views\home\Home.vue
 * @Description: 
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Menu from './components/Menu.vue';
import UserTable from './components/UserTable.vue'
import userApi, { User } from '../../api/user'
import orgApi, { Org } from '../../api/org'

export interface MenuItemType extends Org {
  // 应该单独放个type文件
  show?: boolean
}

let user = ref<User[]>()
let org = ref<MenuItemType[]>()
let currentORG = ref('')
let loading = ref(false)

/**
 * 获取部门信息
 */
async function getOrganization() {
  
  return new Promise(async (resolve, reject) => {
    const find = (list: MenuItemType[], id: string) => {
      list.forEach(async (item) => {
        if (item.id !== id) {
          if (item.child) {
            find(item.child, id)
          }
        } else {
          if (!item.child) {
            item.child = await orgApi.query(currentORG.value)
            item.show = true
            resolve(item.child)
          } else {
            item.show = !item.show
            resolve(null)
          }
        }
      })
    }

    if (!org.value) {
        org.value = await orgApi.query(currentORG.value)
        resolve(org.value)
      } else {
        find(org.value, currentORG.value)
      }
  });
}

/**
 * 获取用户信息
 */
async function getUser(key?: string) {
  user.value = await userApi.query({orgId: currentORG.value, name: key}).then((res) => (user.value = res))
}

/**
 * 发起搜索
 */
async function handleSearch(key: string) {
  loading.value = true
  await getUser(key)
  loading.value = false
  
}

/**
 * 点击部门节点
 */
async function handleClick(id: string) {
  loading.value = true
  currentORG.value = id
  const res = await getOrganization()
  if (res) await getUser()
  loading.value = false
}

onMounted(async () => {
  await getOrganization()
})
</script>

<template>
  <div class="layout">
    <div class="menu">
      <Menu :org="org" :current-org="currentORG" @handleClick="handleClick"></Menu>
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
  display: flex;
  align-items: center;
  color: aqua;
  background: rgba(0,0,0, 0.3);
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
