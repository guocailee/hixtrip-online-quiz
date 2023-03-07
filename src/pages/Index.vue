<script setup lang="ts">
import {  ref } from 'vue'

import OrgTree from '../components/OrgTree.vue';
import UserTable from '../components/UserTable.vue';

let orgId = ref<string>()
let keyword = ref<string>()

function clickOrg(id: string){
  orgId.value = id
  keyword.value = ''
}

</script>

<template>
  <div class="container">
    <org-tree class="aside" ref="orgRef" @clickOrg="clickOrg"></org-tree>

    <div class="main">
      <div>{{ keyword }}
        <input class="search" type="text" v-model.lazy="keyword" placeholder="输入关键字搜索">
        <UserTable :orgid="orgId" :keyword="keyword"></UserTable>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container{
  display: flex;
}
.aside{
  width: 200px;
}
.main{
  flex: 1;
}
.search{
  width: 100%;
  margin-bottom: 20px;
}
</style>
