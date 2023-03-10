<template>
  <div class="org-tree">
    <div
      v-for="node in nodes"
      :key="node.id"
      @click="onNodeClick(node)"
      :class="{ active: node.id === currentId }"
    >
      <span :class="{ rotate: node.expanded }" @click.stop="onNodeExpand(node)">
        <i class="iconfont">
          <!-- 点击这里加载节点 -->
          {{ node.expanded ? "➡️" : "⬇" }}</i
        >
      </span>
      <span>{{ node.name }}</span>
      <div v-if="node.loading" class="loading">
        <i class="iconfont">加载中。。</i>
      </div>
      <org-tree
        v-if="node.expanded"
        :pid="node.id"
        @node-click="onNodeClick"
      ></org-tree>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, Ref, ref } from "vue"
import orgApi from "../api/org"
interface Node {
  id: string
  name: string
  expanded: boolean
  loading: boolean
  children?: Node[]
}
const props = defineProps<{ pid: string }>()
const emit = defineEmits(["node-click"])

const nodes = ref([]) as Ref<Node[]>
const currentId = ref("0") as Ref<string>

async function loadNodes(pid = props.pid) {
  const data = await orgApi.query(pid)
  nodes.value = data.map((node) => {
    return {
      ...node,
      expanded: false,
      loading: false,
    }
  })
}

async function loadChildren(node: Node) {
  node.loading = true
  const response = await orgApi.query(node.id)
  const data = (await response) as Node[]
  node.loading = false
  node.expanded = true
  node.children = data.map((child) => {
    child.expanded = false
    child.loading = false
    return child
  })
}

function onNodeClick(node: Node) {
  currentId.value = node.id
  emit("node-click", node.id)
}

function onNodeExpand(node: Node) {
  node.expanded = !node.expanded
  if (node.expanded) {
    loadChildren(node)
  }
}

onMounted(() => {
  loadNodes()
})
</script>

<style scoped>
.org-tree {
  border: 1px solid #ddd;
  padding: 10px;
  max-width: 200px;
  overflow-y: auto;
}

.org-tree div {
  cursor: pointer;
  padding: 5px;
  position: relative;
}

.org-tree div:hover,
.org-tree .active {
  background-color: #eee;
}

.org-tree .rotate {
  transition: transform 0.3s;
  transform: rotate(-90deg);
}

.org-tree .loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.org-tree .loading i {
  font-size: 18px;
  color: #666;
  animation: rotating 2s linear infinite;
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
