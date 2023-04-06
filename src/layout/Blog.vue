<template>
  <div class="blog-wrapper">
    <Header></Header>
    <Main></Main>
  </div>
</template>

<script setup lang="ts">
import { Header, Main } from './components/index'
</script>

<style lang="scss">
.blog-wrapper {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right bottom, #9EFBD3, #57E9F2, #45D4FB) no-repeat;
  background-size: cover;
}
</style>
