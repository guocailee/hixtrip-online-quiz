<template>
    <div>
        <el-card class="box-card">
            <div class="searchBar">
                <el-input
                    class="nameInput"
                    v-model="form.name"
                    placeholder="搜索"
                    :prefix-icon="Search"
                    @change.laze="handleInputChange"
                />
                <el-select v-model="form.status" placeholder="Select" class="loginStauts">
                    <el-option
                        :key="1"
                        label="登录状态"
                        :value="1"
                    />
                </el-select>
                <div class="label"> <span class="num">{{ list?.length }}</span>个成员</div>
            </div>
            <el-table :data="list" style="width: 100%">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="name" label="姓名" sortable />
                <el-table-column prop="id" label="用户名" sortable />
            </el-table>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const form = reactive({
    name: '',
    status: 1
})
import { defineProps } from 'vue'
const props = defineProps({
    list: Array
})
const emits = defineEmits('onNameSearch')
const handleInputChange = (value) => {
    emits('onNameSearch', value)
}
</script>

<style scoped>
.searchBar {
    display: flex;
    align-items: center;
}
.nameInput {
    width: 300px;
}
.loginStauts {
    margin: 0 10px;
}
</style>