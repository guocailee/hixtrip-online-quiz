<template>
  <div class="custom-tree-container">
    <p class="flex justify-between">部门 <strong @click="append" class="text-25px cursor-pointer">+</strong></p>
    <el-tree
      :data="dataSource"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      @node-click="test"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const props=defineProps({
    dataSource:{
        type:Array,
        default:[]
    }
})
interface Tree {
  id: number
  label: string
  children?: Tree[]
}
let id = 1000
console.log('props',props)
const emit = defineEmits(['getTitle']);


const append = () => {
  const newChild = { id: id++, label: 'testtest', children: [] }
  props.dataSource.push(newChild)
}
const test=(val:string)=>{
  emit('getTitle',val)
}

</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
