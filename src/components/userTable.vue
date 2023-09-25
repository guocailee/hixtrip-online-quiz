<template>
    <div class="user-table">
        <div class="user-table_filter">
            <input type="text" v-model="filter.key" placeholder="输入用户名或者ID搜索" @input="filter.change">
        </div>
        <table style="border: 1px solid black">
            <thead>
                <tr>
                    <th>id</th>
                    <th>用户名</th>
                </tr>
            </thead>
            <tbody>
                <div v-if="list.length == 0">暂无数据</div>
                <tr v-for="( item, index ) in list" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType, reactive } from 'vue'
import { debounce } from "./../utils/delay";

const props = defineProps({
    list: {
        type: Array as PropType<{ id: string, name: string }[]>,
        default: () => {
            return []
        }
    }
})

const emits = defineEmits([ 'onChange' ])

const filter = reactive<any>({
    key: '',
    change: debounce((e: string) => {
        emits('onChange', filter.key)
    }, 400)
})

function getData() {
    emits('onChange', filter.key)
}

defineExpose({
    getData
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
