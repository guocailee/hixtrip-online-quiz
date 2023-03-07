<script setup lang="ts">
import { ref, watch } from 'vue'
import userApi from '../api/user'

const props = defineProps({
  orgid: String,
  keyword: String
})

interface User{
  name: string,
  id: string
}

const user = ref<User[]>()
watch(() => [props.orgid, props.keyword], async() => {
  userApi.query({id: props.orgid, name: props.keyword}).then((res) => {
    console.log('user: ', res)
    user.value = res
  })
})

</script>
<template>
  <table class="table" border="1" cellspacing="0">
    <tr>
      <td>id</td>
      <td>name</td>
    </tr>
    <template v-if="user && user.length">
      <tr v-for="item in user" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.name }}</td>
    </tr>
    </template>
    <tr v-else>
      <td colspan="2">暂无数据</td>
    </tr>
  </table>
</template>

<style scoped>
.table{
  width: 100%;
}
</style>