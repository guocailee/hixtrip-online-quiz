<template>
  <div>
    <h2>用户表格</h2>
    <input type="text" v-model="searchKeyword" @input="searchUsers" placeholder="请输入搜索关键字" />
    <table>
      <thead>
        <tr>
          <th>用户ID</th>
          <th>用户名</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import userApi from "../api/user";

let searchKeyword = ref<String>("");
let users = ref<any>();
let filteredUsers = ref<any>();
let timer = ref<any>(null);

const props = defineProps({
  pid: Number,
});

// 监听组织结构点击后
watch(
  () => props.pid,
  (val) => {
    let _params = {
      id:val
    }

    getData(_params)
  }
);

const getData = (_params:any) => {
  userApi.query(_params).then((res) => {
    users.value = res;
    filteredUsers.value = res;
  });
}


// 关键字搜索实现防抖
const searchUsers = () => {
  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    timer = null;
    filteredUsers.value = users.value.filter((user: any) => {
      return user.name.toLowerCase().includes(searchKeyword.value.toLowerCase());
    });
  }, 500);
  
};
</script>