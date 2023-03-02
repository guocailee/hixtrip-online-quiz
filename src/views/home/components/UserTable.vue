<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { User } from '../../../api/user'

const props = defineProps<{
  user?: User[]
}>()
const emit = defineEmits<{
  (e: 'handleSearch', key: string): void
}>()
onMounted(async () => {
})
</script>

<template>
  <div class="layout">
    aa
  </div>
</template>

<style scoped>
.layout {
    width: 100%;
}
</style>
