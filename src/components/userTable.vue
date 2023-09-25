<template>
    <div class="user-table">
        <div class="user-table_filter">
            <input type="text" v-model="filterKey" placeholder="输入用户名或者ID搜索">
        </div>
        <table style="border: 1px solid black">
            <thead>
                <tr>
                    <th>id</th>
                    <th>用户名</th>
                </tr>
            </thead>
            <tbody>
                <div v-if="filterList.length == 0">暂无数据</div>
                <tr v-for="( item, index ) in filterList" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue'

interface ListCell {
  id: string
  name: string
}

const props = defineProps({
    list: {
        type: Array as PropType<{ id: string, name: string }[]>,
        default: () => {
            return []
        }
    },
    modelValue: {
        type: String
    }
})

const filterKey = ref<string>('')

const filterList = computed(() => {
    return props.list.filter((item: ListCell) => item.name.indexOf(filterKey.value) > -1 || item.id.indexOf(filterKey.value) > -1)
})

</script>

<style scoped>
.user-table {
    padding: 0 10px;
}

.user-table_filter {
    margin-bottom: 10px;
}
</style>
