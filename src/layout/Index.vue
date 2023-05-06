<template>
  <div class="index-wrapper">
    <Header></Header>
    <div class="view">
      <Menus></Menus>

      <router-view #default="{ Component }" class="router-view">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>

    </div>
  </div>
</template>

<script setup lang='ts'>
import { Menus, Header } from './components';
import { ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
import { useIndexStore } from '@/store'
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

    .tabs {
      flex: 1;
      display: flex;
      flex-direction: column;

      ::v-deep(.el-tabs__content) {
        flex: 1;

        .el-tab-pane {
          height: 100%;
        }
      }

      .router-view {
        flex: 1;
      }
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