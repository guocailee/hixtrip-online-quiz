<template>
    <div class="org-menu">
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
    </div>
</template>
    
<script setup lang="ts">
import { onMounted, ref, defineEmits } from 'vue'
import orgApi from '@/api/org'
import {
    Plus
} from '@element-plus/icons-vue'

const emit = defineEmits(["orgTableCurrentChange", "update:orgBreadcrumb"])
interface Org {
    id: string;
    name: string;
    parentId: string;
    hasChildren?: boolean;
    children?: Org[];
}

let orgTableCurrentId = '';
let orgTableData = ref<any>([]);

function orgBreadcrumb() {
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
    findParent(orgTableData.value, orgTableCurrentId, result);
    emit("update:orgBreadcrumb", result);
};


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
        orgTableCurrentId = data.id;
        emit("orgTableCurrentChange", orgTableCurrentId);
        orgBreadcrumb();
    }
}


async function init() {
    const orgs = await orgApi.query();
    orgTableData.value = orgs;
    if (orgs[0]) {
        const orgId = orgs[0].id;
        orgTableCurrentId = orgId;
        emit("orgTableCurrentChange", orgTableCurrentId);
        orgBreadcrumb();
    }
}

onMounted(() => {
    init();
})
</script>
<style scoped lang="less">
@header-header: 40px;
@border-line: 1px #eee solid;

.org-menu /deep/ .el-table td.el-table__cell {
    border-bottom: none; // 穿透去除表格分割线
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

}
</style>
    