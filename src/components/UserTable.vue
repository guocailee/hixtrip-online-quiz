<template>
  <el-table
    border
    :data="list"
    :default-sort="{ prop: 'name' }"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column prop="name" sortable label="姓名">
      <template #default="{ row }">
        <el-avatar :size="50">{{ row.name }}</el-avatar>
        {{ row.name }}
      </template>
    </el-table-column>
    <el-table-column prop="name" sortable label="用户名" />
  </el-table>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface User {
  date: string;
  name: string;
  address: string;
}

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
});

const multipleSelection = ref<User[]>([]);

const handleSelectionChange = (val: User[]) => {
  console.log(val);

  multipleSelection.value = val;
};
</script>

<style lang="scss" scoped>
.el-avatar {
  background-color: #57abf3;
}
</style>
