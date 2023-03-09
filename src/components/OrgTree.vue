<script setup lang="ts">
import { reactive } from "vue";
import orgApi from "../api/org";
const props = defineProps({
  org: [],
});
const emits = defineEmits(["node-click"]);
const treeProps = reactive({
  label: "name",
});
let curNodeData = {};
const loadNode = (node, resolve) => {
  if (node.level > 1) return resolve([]);
  orgApi.query(curNodeData.id).then((res) => resolve(res));
};
const handleNodeClick = (data, node) => {
  curNodeData = data;
  if (node.level === 1) return;
  emits("node-click", { data, node });
};
</script>
<template>
  <div class="org-tree">
    <div class="title">
      <h3>部门</h3>
      <el-icon><Plus /></el-icon>
    </div>
    <div class="tree">
      <el-tree
        lazy
        :data="props.org"
        :props="treeProps"
        node-key="id"
        @node-click="handleNodeClick"
        :load="loadNode"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
      >
        <template #default="{ node }">
          <span class="custom-tree-node">
            <el-icon><ElemeFilled /></el-icon>
            <span style="margin-left: 8px">{{ node.label }}</span>
          </span>
        </template>
      </el-tree>
    </div>
  </div>
</template>
<style scoped >
.org-tree {
  width: 300px;
  height: 100%;
  border: 1px solid #e4e7ed;
  border-top: 0;
}
.org-tree .title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 15px;
}
.org-tree .title h3 {
  font-size: 16px;
}
.org-tree .tree {
  padding: 15px 0 15px 15px;
  height: calc(100% - 57px);
}
.el-tree {
  height: 100%;
  overflow: auto;
}
.custom-tree-node {
  display: flex;
  align-items: center;
}
</style>