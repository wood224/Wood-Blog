<template>
  <div class="cover-wrapper">
    <div class="title">{{ title }}</div>
    <div class="bg-text" :style="{ backgroundPosition: textStyle }">
      <span>Wood</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const title = computed(() => {
  return route.meta.title;
})

const textStyle = ref('');

onMounted(() => {
  document.addEventListener('scroll', () => {
    textStyle.value = window.scrollY === 0 ? '' : `calc(50% + ${scrollY}px) calc(50% + ${scrollY}px)`
  })
})
</script>

<style scoped lang='scss'>
.cover-wrapper {
  position: relative;
  width: 100%;
  text-align: center;
  padding-top: 70px;

  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 40px;
    font: bold 40px '';
    color: white;
    letter-spacing: 20px;
  }

  .bg-text {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url(../../assets/img/Blog/SnowMountain.jpg);
    background-size: cover;
    background-position: 50% 50%;
    font: bold 30vw '';
    background-clip: text;
    -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    color: transparent;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -99;
      background-image: inherit;
      background-size: cover;
      background-position: 50% 50%;
    }
  }
}
</style>