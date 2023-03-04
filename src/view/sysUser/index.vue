<template>
  <div class="sys-user">
    <el-container>
      <el-aside width="250px" class="ory-menu-aside">
        <div class="user-header">
          <div class="title">部门</div>
          <el-button link :icon="Plus"></el-button>
        </div>
        <div class="org-menu">
          <el-table highlight-current-row @current-change="orgTableCurrentChange" :show-header="false"
            :data="orgTableData" style="width: 100%" row-key="id" lazy :load="orgTableLoad"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
            <el-table-column prop="name" label="name" />
          </el-table>
        </div>
      </el-aside>
      <el-main>
        <div class="user-header">
          <div class="org-breadcrumb">
            <el-button link :icon="Discount"></el-button>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="(item, index) in orgBreadcrumb" :key="item.id"><span
                  :class="{ blodFont: orgBreadcrumb.length == index + 1 }">{{ item.name }}</span></el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
        <div class="user-table">
          <div class="header">
            <el-input v-model="userName" class="w-50 m-2 user-name-input" size="large" placeholder="搜索"
              @change="userNameChange" :prefix-icon="Search" />
            <el-divider direction="vertical" />
          </div>
          <el-table :data="userTableData" style="width: 100%" row-key="id"
            :default-sort="{ prop: 'name', order: 'descending' }">
            <el-table-column type="selection" width="30" />
            <el-table-column prop="name" label="姓名" sortable>
              <template #default="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="用户名" sortable />
          </el-table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
  
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import orgApi from '@/api/org'
import usreApi from '@/api/user'
import OrgMenu from './components/OrgMenu.vue'
import UsereTable from './components/UserTable.vue'
import {
  Plus,
  Discount,
  Search
} from '@element-plus/icons-vue'

interface Org {
  id: string;
  name: string;
  parentId: string;
  hasChildren?: boolean;
  children?: Org[];
}

let orgTableCurrentId = ref<any>();
let userName = ref<any>('');
let orgTableData = ref<any>([]);
let userTableData = ref<any>([]);

let orgBreadcrumb = computed(() => {
  function findParent(data: Org[], rowId: string, result: Org[]) {
    for (let i in data) {
      let { id, name, parentId, children } = data[i]
      if (id === rowId) {
        //将查找到的目标数据加入结果数组中
        //可根据需求unshift(item.id)或unshift(item)
        result.unshift({ id, name, parentId })
        return true
      }
      if (children && children.length > 0) {
        let ok = findParent(children, rowId, result)
        if (ok) {
          result.unshift({ id, name, parentId })
          return true
        }
      }
    }
    //走到这说明没找到目标
    return false
  }
  const result: Org[] = [];
  findParent(orgTableData.value, orgTableCurrentId.value, result);
  return result;
});


function orgTableLoad(row: Org,
  treeNode: unknown,
  resolve: (data: Org[]) => void) {
  orgApi.query(row.id).then((res) => {
    row.children = res; // 更新orgTableData数据
    resolve(res)
  })
}

async function orgTableCurrentChange(data: Org | undefined) {
  if (data) {
    orgTableCurrentId.value = data.id;
    // 部门切换 
    userName.value = ''
    const users = await usreApi.query({ orgId: orgTableCurrentId.value });
    userTableData.value = users;
  }
}

async function userNameChange(value: string) {
  const users = await usreApi.query({ orgId: orgTableCurrentId.value, name: value });
  userTableData.value = users;
}

async function init() {
  const orgs = await orgApi.query();
  orgTableData.value = orgs;
  if (orgs[0]) {
    const orgId = orgs[0].id;
    orgTableCurrentId.value = orgId;
    const users = await usreApi.query({ orgId });
    userTableData.value = users;
  }
}

onMounted(() => {
  init();
})

</script>

<style scoped lang="less">
@header-header: 40px;
@border-line: 1px #eee solid;

.ory-menu-aside {
  border-right: @border-line;
}

.org-menu /deep/ .el-table td.el-table__cell {
  border-bottom: none; // 穿透去除表格分割线
}

.blodFont {
  font-size: large;
  color: #000;
}

.user-table {
  margin-left: 10px;

  .header {
    border-bottom: @border-line;

    .user-name-input {
      width: 300px;

      :deep(.el-input__wrapper) {
        box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
        cursor: default;

        .el-input__inner {
          cursor: default !important;
        }
      }
    }

  }



}


.user-header {
  display: flex;
  justify-content: space-between;
  height: @header-header;
  align-content: center;
  border-bottom: @border-line;
  font-size: 14px;
  padding: 0 10px;

  .title {
    height: @header-header;
    line-height: @header-header;
  }

  .org-breadcrumb {
    display: flex;
    align-content: center;

    .el-breadcrumb {
      height: @header-header;
      line-height: @header-header;
    }
  }


}
</style>
  