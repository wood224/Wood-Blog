<template>
  <div class="loading-wrapper" ref="loadingRef">
    <div v-if="props.more" class="loader"></div>
    <div v-else class="no-more">没有更多数据了~~~</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

const props = defineProps<{
  more: boolean
}>()

const loadingRef = ref<HTMLElement | null>(null)
</script>

<style scoped>
.loading-wrapper {
  text-align: center;
  padding: 10px;
}

.loader {
  width: 24px;
  height: 24px;
  border: 2px solid #ccc;
  border-top: 2px solid #333;
  border-radius: 50%;
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.no-more {
  color: #999;
  font-size: 14px;
}
</style>