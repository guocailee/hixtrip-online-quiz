<template>
  <div>
    <h2>组织架构</h2>
    <ul>
      <li v-for="item in orgTreeData" :key="item.id">
        <span @click="loadChildNodes(item.id)">
          {{ item.name }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import orgApi from '../api/org'
import { ref,onMounted  } from 'vue';

let orgTreeData = ref<any>()
onMounted(() => {
  orgApi.query().then((res) => {
        orgTreeData.value = res
    })
})

const emits = defineEmits(["load-child-nodes"])

const loadChildNodes = (parentId: number) => {
    emits('load-child-nodes',parentId)
}

</script>