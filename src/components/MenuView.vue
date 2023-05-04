<template>
  <div class="menu-view-wrapper">
    <div class="title">
      <span>{{ title }}</span>
    </div>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useIndexStore } from '@/store/index'

const store = useIndexStore();

const route = useRoute();
store.setMenuViewTitle(route.meta.title as string);
const title = computed(() => {
  return store.menuViewTitle;
});
</script>

<style scoped lang='scss'>
.menu-view-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #EFF0F4;

  .title {
    margin-bottom: 20px;
    height: 40px;
    line-height: 40px;
    font-size: 28px;
    font-weight: bold;
  }

  .container {
    flex: 1;
    overflow: hidden;
  }
}
</style>