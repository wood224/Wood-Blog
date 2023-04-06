<template>
  <div class="index-wrapper">
    <Menus></Menus>
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { Menus } from './components';
</script>

<style scoped lang='scss'>
.index-wrapper {
  display: flex;
  width: 100%;
  height: 100%;

  .view {
    flex: 1;
  }
}
</style>