<template>
  <div class="OrgTree-container">
    <div class="header">
      <span>部门</span>
      <el-icon :size="20" color="#999">
        <Plus />
      </el-icon>
    </div>
    <div class="center">
      <el-tree :data="org" :props="defaultProps" :load="loadNode" lazy @node-click="handleNodeClick" />
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
  name: string,
  children?: Tree[]
}

let org = ref<Tree[]>()

const defaultProps = {
  children: 'children',
  label: 'name',
}

onMounted(() => {
  orgApi.query().then((res) => {
    org.value = res
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
const handleNodeClick = (data: Tree, node: Node) => {
  label = node.label;
  if (node.level > 1) {
    getLabelName(node.parent)
  }

  mittBus.emit('handleNodeClick', {
    id: data.id,
    label: label
  })
}
</script>
 
<style lang = "scss" scoped>
.OrgTree-container {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    height: 50px;
    padding: 0 15px;
  }

  .center {
    padding: 15px;
  }
}
</style>