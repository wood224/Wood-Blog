<template>
  <div class="index-wrapper">
    <Menus></Menus>
    <div class="view">
      <router-view #default="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
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

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.4s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }
  }
}
</style>