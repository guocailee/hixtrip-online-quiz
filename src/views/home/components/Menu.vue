<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MenuItem from './MenuItem.vue'
import { Org } from '../../../api/org'
import { MenuItemType } from '../Home.vue'

const props = defineProps<{
  org?: MenuItemType[],
  currentORG?: string
}>()
const emit = defineEmits<{
  (e: 'handleClick', id: string): void
}>()

function handleClick(id: string) {
    emit('handleClick', id)
}
</script>

<template>
  <div class="layout">
    <MenuItem :key="index" v-for="(item, index) in org">
        <span class="item-title" v-if="!item.child && !item.show" @click="handleClick(item.id)">{{item.name}}</span>

        <template v-else>
            <span :class="{'item-title': true, 'choosed': item.show}" @click="handleClick(item.id)">{{item.name}}</span>
            <Menu v-show="item.show" :org="item.child" @handleClick="handleClick"></menu>
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
.choosed {
    color: aqua;
    font-weight: bold;
}
</style>
