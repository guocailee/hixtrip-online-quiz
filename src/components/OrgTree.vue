<template>
  <el-tree
    icon="ArrowRightBold"
    :props="defaultProps"
    :data="list"
    :highlight-current="true"
    :expand-on-click-node="false"
    @node-click="handleNodeClick"
  >
    <template v-slot="item">
      <el-icon
        style="margin-right: 10px"
        :color="id === item.data.id ? '#51ABF0' : ''"
      >
        <Operation />
      </el-icon>
      <span :style="{ color: id === item.data.id ? '#51ABF0' : '' }">
        {{ item.data.name }}
      </span>
    </template>
  </el-tree>
</template>

<script lang="ts" setup>
import { ref, PropType } from "vue";

interface Organization {
  id: string;
  name: string;
}

const props = defineProps({
  list: { 
    type: Array as PropType<Organization[]>,
    required: true 
  },
  id: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:id'])

const defaultProps = {
  children: "children",
  label: "label",
};

const handleNodeClick = ({ id }: { id: string }) => {
  if (id === props.id) return
  emit('update:id', id)
};
</script>

<style lang="scss" scoped>
.el-tree {
  ::v-deep(.el-tree-node__content) {
    height: 40px;
  }
}
</style>
