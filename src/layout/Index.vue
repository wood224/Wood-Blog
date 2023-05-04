<template>
  <div class="index-wrapper">
    <Header></Header>
    <div class="view">
      <Menus></Menus>
      <router-view #default="{ Component }" class="router-view">
        <transition name="fade" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { Menus, Header } from './components';
</script>

<style scoped lang='scss'>
.index-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .view {
    display: flex;
    flex: 1;
    overflow: hidden;

    .router-view {
      flex: 1;
    }

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