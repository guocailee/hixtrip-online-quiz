<!--
 * @Author: No1white 1072368472@qq.com
 * @Date: 2023-09-25 19:56:17
 * @LastEditors: No1white 1072368472@qq.com
 * @LastEditTime: 2023-09-25 22:56:39
 * @FilePath: \pd-design-demoe:\WorkSpace\hixtrip-online-quiz\src\components\OrgTree.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="treeWrap">
        <div class="titleLine">
        <div class="title">部门</div>
        <el-icon><Plus /></el-icon>
        </div>
        <el-tree
            :props="props"
            :load="loadNode"
            :highlight-current="true"
            :render-after-expand="true"
            lazy
            accordion
            @node-click="handleNodeClick"
            />
    </div>
</template>
<script lang="ts" setup>
import { defineEmits } from 'vue'
import orgApi from '../api/org'
import type Node from 'element-plus/es/components/tree/src/model/node'
interface Tree {
    name: string
    leaf?: boolean
}
const props = {
  children: 'children',
  label: 'name',
}
const emits = defineEmits('onSelectOrg')
const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
    if (node.level === 0) {
        return resolve([{ name: '厦门嗨行旅游' }])
    }
    orgApi.query({ parentId: node.id }).then((res) => {
        resolve(res.map(item => ({
            ...item,
            children: []
        })))
    })
}
const handleNodeClick = (data: Tree, node) => {
  emits('onSelectOrg', {
    ...data,
    level: node.level
  })
}
</script>
<style>
.treeWrap {
    width: 300px;
}
.titleLine {
    padding: 10px;
    display: flex;
    justify-content: space-between;
}
.el-tree-node:focus > .el-tree-node__content {
  color: rgb(158, 213, 250) !important;
}
</style>