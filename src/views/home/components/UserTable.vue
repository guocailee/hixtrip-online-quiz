<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { User } from '../../../api/user'

const search = ref<any>()
const key = ref('')
const props = defineProps<{
  user?: User[]
}>()
const emit = defineEmits<{
  (e: 'handleSearch', key: string): void
}>()

function handleSearch() {
    search.value()
}
function debounce(func: Function, time: number) {
    let timer: number | null = null;
    return (...args: any) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(args)
            clearTimeout(timer!)
        }, time)
    }
}

onMounted(() => {
    search.value = debounce(() => {
        emit('handleSearch', key.value)
    }, 300)
})
</script>

<template>
  <div class="layout">
    <div class="search">
        <input v-model="key" @input="handleSearch()"/>
    </div>
    <div class="table">
        <table>
            <thead>
                <tr>
                    <th>用户ID</th>
                    <th>用户名</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item of user" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<style scoped>
.layout {
    width: 100%;
    display: flex;
    flex-direction: column;
}
.search {
    padding-bottom: 20px;
}
.table {
    width: 100%;
    max-height: 80%;
    overflow-y: auto;
}
th,td {
    border: 1px solid #fff;
}
</style>
