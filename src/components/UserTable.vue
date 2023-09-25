<template>
    <div class="mt-5 mb-1 flex">
      <el-input class="w-1/3" v-model="search" size="small" placeholder="搜索" />
        <div class="ml-50px flex">登录状态<div class="ml-5px">{{ filterTableData.length }}个成员</div>
    </div>
    </div>
  <el-table :data="filterTableData" border height="400"  style="width: 100%">
    <el-table-column type="selection" width="55" />
    <el-table-column label="id" prop="id" sortable  />
    <el-table-column label="name" prop="name" sortable  />
  </el-table>
</template>

<script lang="ts" setup>
import { computed, ref ,toRefs} from 'vue'
const props=defineProps({
    user:{
        type:Array,
        default:[]
    }
})
const search = ref('')
const filterTableData = computed(() =>
  props.user.filter(
    (data:any) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>
