<template>
  <div class="cover-wrapper">
    <div class="title">{{ title }}</div>
    <div class="bg-text" :style="{ backgroundPosition: textStyle }">
      <span>Wood</span>
    </div>
    <div class="daily">
      <AutoPrint :word="word"></AutoPrint>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getDailyWordApi } from '../../api';
import { Word } from '../../types';

const route = useRoute();

const title = computed(() => {
  return route.meta.title;
})

const word = ref(new Word());
const getDailyWord = () => {
  getDailyWordApi().then(res => {
    const data = res.data;
    const { hitokoto, from_who, from, type } = data;
    word.value.text = hitokoto;
    word.value.author = from_who ?? '';
    word.value.title = from ?? '';
    word.value.type = type;
  })
}
getDailyWord();

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
    margin-top: 70px;
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
    background-image: url(../../assets/img/Blog/R-C.jpg);
    background-size: cover;
    background-position: 50% 50%;
    font: bold 30vw '';
    background-clip: text;
    -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    color: transparent;
    overflow: hidden;
    user-select: none;

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

  .daily {
    position: absolute;
    bottom: 8vh;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    min-height: 40px;
    border-radius: 10px;
    background-color: rgba(52, 52, 52, 0.6);
    color: white;
  }
}
</style>