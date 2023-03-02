<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MenuItem from './MenuItem.vue'
import { Org } from '../../../api/org'

const props = defineProps<{
  org?: Org[]
}>()
const emit = defineEmits<{
  (e: 'handleClick', id: string): void
}>()

function handleClick(id: string) {
    console.log('qqq')
    emit('handleClick', id)
}
onMounted(async () => {
    emit('handleClick', '1')
})
</script>

<template>
  <div class="layout">
    <MenuItem :key="index" v-for="(item, index) in org">
        <span class="item-title" v-if="!item.child" @click="handleClick(item.id)">{{item.name}}</span>

        <template v-else>
            <span >{{item.name}}</span>
            <!-- 递归操作 -->
            <Menu :org="item.child" @handleClick="handleClick"></menu>
      </template>
    </MenuItem>
  </div>
</template>

<style scoped>
.layout {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    overflow: auto;
}
.item-title {

}
</style>
