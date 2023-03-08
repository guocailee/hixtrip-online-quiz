<script setup lang="ts">
import userApi from "../api/user";

interface ListItem {
    value: string;
    label: string;
}

const props = defineProps<{
    orgId?: string
}>();


let user = ref<any>([]);
let value = ref<string[]>([]);
let userId = ref<string>();
const options = ref<ListItem[]>([]);
const loading = ref(false);

const getTableData = (params: {
    id?: string
    name?: string
    orgId?: string
}) => {
    userApi.query(params).then((res) => {
        user.value = res
        loading.value = false
        if (params.name) {
            options.value = res.map(item => ({
                label: item.name,
                value: item.id
            }))
        } else {
            options.value = []
        }
    });
}

watchEffect(() => {
    if (!props.orgId) return;
    getTableData({ orgId: props.orgId, id: userId.value })
})

const remoteMethod = async (query: string) => {
    loading.value = true
    if (query) {
        loading.value = true
        userApi.query({ orgId: props.orgId, name: query }).then((res) => {
            loading.value = false
            options.value = res.map(item => ({
                label: item.name,
                value: item.id
            }))
        });
    } else {
        options.value = []
    }
}

const handleSelectChange = (val: string) => {
    userId.value = val
}


</script>

<template>
    <div>
        <div class="header">
            <i-ep-fold lass="v-icon" />
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">厦门嗨行旅游</el-breadcrumb-item>
                <el-breadcrumb-item>技术部</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tableBody">
            <div class="search">
                <el-select v-model="value" @change="handleSelectChange" :loading="loading" filterable remote
                    :remote-method="remoteMethod" reserve-keyword placeholder="请输入组织名称" remote-show-suffix>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <div class="table">
                <el-table :data="user" style="width: 100%">
                    <el-table-column label="姓名" prop="name" />
                    <el-table-column label="用户名" prop="name" />
                </el-table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid #dcdfe6;
    padding: 0 12px;
}

.tableBody {
    padding: 12px;
}

.v-icon {
    vertical-align: middle;
    margin-right: 8px
}
</style>