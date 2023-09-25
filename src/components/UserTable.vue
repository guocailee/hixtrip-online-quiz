<template>
  <div class="UserTable-container">
    <div class="header">
      {{ label }}
    </div>
    <div class="center">
      <div class="query-box">
        <el-input v-model="input" @change="search" placeholder="搜索" :prefix-icon="Search"
          style="width:200px;margin-right: 20px;" />
        <el-select v-model="status" class="m-2" placeholder="登录状态" size="large" @change="selectStatus">
          <el-option v-for="item in statusArr" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <span style="margin-left: 20px;">{{ userData?.length }}个成员</span>
      </div>
      <el-table v-if="userData" :data="userData" border v-loading="isLoading" style="width: 100%">
        <el-table-column type="selection" width="60" />
        <el-table-column label="姓名" sortable>
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <div class="icon-rd">xx</div>
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名" sortable />
      </el-table>
      <el-empty v-else>
      </el-empty>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import userApi from '../api/user';
import { onMounted, ref, onUnmounted } from 'vue';
import mittBus from '../utils/mitt';
import { ElMessage } from 'element-plus';
import { Search, User } from '@element-plus/icons-vue';
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
  status?: string
}
let input = ref<any>();
let label = ref<string>('全部');
let userData = ref<User[]>();
let oldData = ref<User[]>();
let isLoading = ref<boolean>(false)
let status = ref('')
let statusArr = [
  {
    value: '在线',
    label: '在线',
  },
  {
    value: '离线',
    label: '离线',
  },
]
onMounted(() => {
  getUserData({})
})
//点击查询
const search = () => {
  userData.value = oldData.value?.filter((item: User) => {
    return (item.name.toLowerCase().includes(input.value.toLowerCase())) && item.status == status.value
  })
}
//在线状态查询
const selectStatus = (e: any) => {
  console.log(e, input.value);
  userData.value = oldData.value?.filter((item: User) => {
    if (input.value) {
      return (input.value && item.name.toLowerCase().includes(input.value.toLowerCase())) && item.status == e
    } else {
      return item.status == e
    }
  })
}

//获取列表数据
const getUserData = (params: Params) => {
  isLoading.value = true;
  status.value = ''
  userApi.query(params).then((res) => {
    isLoading.value = false;
    res.map((item: User, idx) => idx % 2 == 1 ? item.status = '在线' : item.status = '离线')
    userData.value = res;
    oldData.value = res;
  }).catch(() => {
    isLoading.value = false;
  })
}
//点击部门获取数据
const clickNode = (obj: Obj) => {
  label.value = obj.label;
  getUserData({ orgId: obj.id })
}
mittBus.on('clickNode', clickNode);

onUnmounted(() => {
  mittBus.off('clickNode', getUserData)
})
</script>
  
<style lang = "scss" scoped>
.icon-rd {
  background-color: #409eff;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 20px;
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