<template>
    <ul class="org-tree">
       <li class="org-tree_cell" :class="[ modelValue == item.id ? 'active' : '' ]" v-for="( item, index ) in list" :key="index" @click="change(item)">{{ item.name }}</li> 
    </ul>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue'

interface ListCell {
  id: string
  name: string
}

const props = defineProps({
    list: {
        type: Array as PropType<ListCell[]>,
        default: () => {
            return []
        }
    },
    modelValue: {
        type: String,
        default: 0
    }
})

const emits = defineEmits([ 'update:modelValue', 'onChange' ])

function change(item: ListCell) {
    emits('update:modelValue', item.id)
    emits('onChange', item)
}

</script>

<style scoped>
.org-tree {
    width: 270px;
    list-style-type: none;
    margin: 0;
    border-right: 1px solid #ccc;
}
.org-tree_cell {
    cursor: pointer;
    
}
.org-tree_cell.active {
    color: #3e9bf0;
    background-color: #edf4ff;
}
</style>
