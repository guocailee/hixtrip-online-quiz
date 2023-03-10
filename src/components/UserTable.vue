<template>
  <div class="UserTable-container">
    <div class="header">
      {{ label }}
    </div>
    <div class="center">
      <div class="query-box">
        <el-input v-model="input" placeholder="搜索" :prefix-icon="Search" style="width:300px;margin-right: 20px;" />
        <el-button type="primary" @click="onQuery" style="margin-right: 20px;">查询</el-button>
        <el-button type="primary" @click="onReset">重置</el-button>
      </div>
      <el-table :data="user" stripe style="width: 100%" v-loading="isLoading">
        <el-table-column type="selection" width="60" />
        <el-table-column prop="name" label="姓名" />
      </el-table>
    </div>
  </div>
</template>
 
<script setup lang='ts'>
import userApi from '../api/user';
import { onMounted, ref, onUnmounted } from 'vue';
import mittBus from '../utils/mitt';
import { ElMessage } from 'element-plus';
import { Search } from '@element-plus/icons-vue';

interface Params {
  id?: string;
  name?: string;
  orgId?: string;
}

interface Obj {
  id: string;
  label: string;
}

interface User {
  id: string;
  name: string;
}

let user = ref<User[]>();
let temporaryData = ref<User[]>();
let input = ref<any>();
let label = ref<string>('全部');
let isLoading = ref<boolean>(false)

onMounted(() => {
  getUserData({})
})

//获取列表数据
const getUserData = (params: Params) => {
  isLoading.value = true;
  userApi.query(params).then((res) => {
    isLoading.value = false;
    user.value = res;
    temporaryData.value = res;
  }).catch(() => {
    isLoading.value = false;
  })
}

//点击节点获取数据
const handleNodeClickFun = (obj: Obj) => {
  label.value = obj.label;
  getUserData({ orgId: obj.id })
}

mittBus.on('handleNodeClick', handleNodeClickFun);

let OldUser: User[];
//点击查询
const onQuery = () => {
  if (!input.value) {
    ElMessage({
      message: '请输入要搜索的关键字！',
      type: 'warning',
    })
    return
  }
  user.value = temporaryData.value?.filter((item: User) => {
    return item.name.indexOf(input.value) !== -1
  })
}
//重置
const onReset = () => {
  input.value = ''
  getUserData({})
}

// 页面卸载时,销毁mitt
onUnmounted(() => {
  mittBus.off('handleNodeClick', getUserData)
})
</script>
 
<style lang = "scss" scoped>
:deep() {
  .el-table {
    height: calc(100vh - 152px);
    overflow: auto;
  }
}

.UserTable-container {
  .header {
    border-bottom: 1px solid #eee;
    height: 50px;
    padding: 0 15px;
    line-height: 50px;
  }

  .center {
    height: 100%;
    padding: 0 15px;

    .query-box {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      height: 60px;
    }
  }
}
</style>