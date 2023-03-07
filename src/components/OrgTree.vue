<script setup lang="ts">
import { onMounted, ref } from 'vue'
import orgApi from '../api/org'

interface Tree {
  id: string
  name: string
  children?: Tree[]
  show?: boolean
}
const org = ref<Tree[]>()
const activeIndex = ref<number>()
const activeSubIndex = ref<number>()
const emit = defineEmits(['clickOrg'])

onMounted(() => {
  orgApi.query().then((res) => {
    console.log('org: ', res)
    org.value = res
  })
})

function clickOrg(data: Tree, index: number){
  orgApi.query(data.id).then((res) => {
    if (res && res.length) {
      data.children = res
      data.show = !data.show
    } else {
      emit('clickOrg', data.id)
      activeIndex.value = index
    }
  })
}
function clickChild(id: string, index:number){
  activeSubIndex.value = index
  emit('clickOrg', id)
}

</script>
<template>
  <ul v-if="org && org.length">
    <li v-for="(item, index) in org" :key="item.id" :style="{color: activeIndex == index ? 'red' : '' }">
      <div @click="clickOrg(item, index)">{{ item.name }}</div>
      <ul v-show="item.show">
        <li v-for="(child, ind) in item.children" :key="item.id"
          @click="clickChild(child.id, ind)"
          :style="{color: activeSubIndex == ind ? 'red' : '' }"
        >{{ child.name }}</li>
      </ul>
    </li>
  </ul>
  <div v-else>暂无数据</div>
</template>

<style scoped>

</style>