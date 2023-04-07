<template>
  <div class="app-wrapper">
    <keep-alive>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </keep-alive>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.app-wrapper {
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  // overflow: hidden;
}
</style>
