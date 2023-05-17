<template>
  <div class="blog-wrapper">
    <Header></Header>
    <Cover></Cover>
    <Main v-show="mainShow"></Main>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Header, Main } from './components/index'

const mainShow = ref(false);

onMounted(() => {
  document.addEventListener('scroll', () => {
    if (window.scrollY >= 40) {
      mainShow.value = true;
    }
  })
})
</script>

<style lang="scss">
.blog-wrapper {
  min-height: 100vh;
  background-size: cover;
}
</style>
