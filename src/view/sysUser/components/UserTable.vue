<template>
    <div>
        <div class="user-header">
            <div class="org-breadcrumb">
                <el-button link :icon="Discount"></el-button>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item v-for="(item, index) in props.orgBreadcrumb" :key="item.id">
                        <span :class="{ blodFont: props.orgBreadcrumb && props.orgBreadcrumb.length == index + 1 }">{{
                            item.name
                        }}</span>
                    </el-breadcrumb-item>
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
    </div>
</template>
    
<script setup lang="ts">
import { ref, defineProps, defineExpose } from 'vue'
import usreApi from '@/api/user'
import {
    Search, Discount
} from '@element-plus/icons-vue'

interface Org {
    id: string;
    name: string;
    parentId: string;
    hasChildren?: boolean;
    children?: Org[];
}


let userName = ref<any>('');
let userTableData = ref<any>([]);
const props = defineProps({
    orgBreadcrumb: {
        type: Array<Org>,
    },
})
let orgTableCurrentId = '';
async function externalUpdateTable(orgId: string) {
    orgTableCurrentId = orgId;
    userName.value = ''
    const users = await usreApi.query({ orgId: orgTableCurrentId });
    userTableData.value = users;
}

async function userNameChange(value: string) {
    const users = await usreApi.query({ orgId: orgTableCurrentId, name: value });
    userTableData.value = users;
}

defineExpose({ externalUpdateTable })

</script>
<style scoped lang="less">
@header-header: 40px;
@border-line: 1px #eee solid;

.blodFont {
    font-size: large;
    color: #000;
}

.user-header {
    display: flex;
    justify-content: space-between;
    height: @header-header;
    align-content: center;
    border-bottom: @border-line;
    font-size: 14px;
    padding: 0 10px;

    .org-breadcrumb {
        display: flex;
        align-content: center;

        .el-breadcrumb {
            height: @header-header;
            line-height: @header-header;
        }
    }


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
</style>
    