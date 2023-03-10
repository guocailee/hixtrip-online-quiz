<template>
  <div class="user-table">
    <input
      type="text"
      v-model="keyword"
      @change="inputHandle"
      placeholder="输入关键字搜索,按回车后生效"
    />
    <table>
      <thead>
        <tr>
          <th>用户 ID</th>
          <th>用户名</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" :data-search="user.name">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref, watch } from "vue"
import userApi from "../api/user"

interface User {
  id: String
  name: String
}

const props = defineProps({
  nodeId: {
    type: String,
    default: "0",
  },
})
const users = ref() as Ref<User[]>
const keyword = ref("") as Ref<string>
const eleStyle = document.createElement("style")
document.head.appendChild(eleStyle)
const inputHandle = () => {
  let value = keyword.value
  console.log("value", value)

  eleStyle.innerHTML = value
    ? '[data-search]:not([data-search*="' + value + '" i]) { display: none; }'
    : ""
}
const loadUsers = async (pid?: string) => {
  const data = await userApi.query(pid)
  users.value = data
}
onMounted(loadUsers)

watch([props.nodeId], () => {
  loadUsers(props.nodeId)
})
defineExpose({
  loadUsers,
})
</script>

<style scoped>
.user-table {
  border: 1px solid #ddd;
  max-width: 600px;
  margin-top: 20px;
  padding: 10px;
}

.user-table input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.user-table table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.user-table th,
.user-table td {
  padding: 8px;
  border: 1px solid #ddd;
}

.user-table th {
  background-color: #f5f5f5;
}

.user-table tbody tr:hover {
  background-color: #eee;
}
</style>
