<template>
  <div class="container">
    <div class="header">
      <span>部门</span>
      <el-icon>
        <Plus />
      </el-icon>
    </div>
    <div class="main">
      <el-tree :data="orgArr" @node-click="clickNode" :props="defaultTree" :load="loadNode" lazy />

    </div>
  </div>
</template>
  
<script setup lang='ts'>
import orgApi from '../api/org';
import { onMounted, ref } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node';
import mittBus from '../utils/mitt';
interface Tree {
  id: string,
  name?: string,
  children?: Tree[]
}
let orgArr = ref<Tree[]>()
const defaultTree = {
  children: 'children',
  label: 'name',
}
onMounted(() => {
  orgApi.query().then((res) => {
    // console.log(res);
    orgArr.value = res
  })
})
//加载子节点
const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
  if (node.level === 0) {
    return resolve([])
  }
  if (node.level === 5) {
    return resolve([])
  }
  orgApi.query(node.data.id).then((res) => {
    resolve(res)
  })
}
//获取父节点路径名
let label: string;
const getLabelName = (node: Node) => {
  if (node.label) {
    label = `${node.label} / ${label}`;
  }
  if (node.parent) {
    getLabelName(node.parent)
  }
}
//点击节点
const clickNode = (data: Tree, node: Node) => {
  label = node.label;
  if (node.level > 1) {
    getLabelName(node.parent)
  }
  mittBus.emit('clickNode', {
    id: data.id,
    label: label
  })
}
</script>
  
<style lang = "scss" scoped>
.container {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    height: 50px;
    padding: 0 15px;
  }
  .main {
    margin: 10px 0;
  }
}
</style>