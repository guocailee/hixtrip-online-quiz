<script setup lang="ts">
import type Node from 'element-plus/es/components/tree/src/model/node'
import orgApi from "../api/org";

interface TreeDataType {
    id: string;
    name: string;
}

const emit = defineEmits<{
    (e: 'nodeClick', id: string): void
}>()

const defaultProps = {
    children: "children",
    label: "name",
};

const handleNodeClick = (data: TreeDataType) => {
    emit('nodeClick', data.id)
};

const loadNode = (node: Node, resolve: any) => {
    orgApi.query(node.data.id).then((res) => {
        resolve(res)
    });
};

</script>

<template>
    <div class="orgTree">
        <div class="orgHead header">
            <div class="title">部门</div>
            <i-ep-plus />
        </div>
        <div class="treeBody">
            <el-tree node-key="id" :expand-on-click-node="false" :load="loadNode" lazy :props="defaultProps"
                @node-click="handleNodeClick">
                <template #default="{ node, data }">
                    <span>
                        <i-ep-fold lass="v-icon" />
                        {{ data.name }}
                    </span>
                </template>
            </el-tree>
        </div>
    </div>
</template>

<style scoped>
.orgTree {
    flex: 0 0 300px;
}

.orgHead {
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid #dcdfe6;
    padding: 0 12px;
    justify-content: space-between;
}

.treeBody {
    padding: 12px;
}

.v-icon {
    vertical-align: middle
}
</style>