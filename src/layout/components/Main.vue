<template>
  <div class="main-wrapper">
    <router-view v-slot="{ Component }">
      <transition name="right" mode="out-in">
        <keep-alive :exclude="['Note']">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const mainShow = ref(false);
onMounted(() => {
  document.addEventListener('scroll', () => {
    if (window.scrollY >= 100) {
      mainShow.value = true;
    }
  })
})
</script>

<style scoped lang="scss">
.main-wrapper {
  margin: 0 auto;
  padding: 30px 0;
  width: 70%;
  // height: calc(100% - 70px);
  min-height: 80vh;
}

@media screen and (max-width:992px) {
  .main-wrapper {
    width: 90%;
  }
}
</style>