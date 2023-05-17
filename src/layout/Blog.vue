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
  padding-top: 70px;
  min-height: 100vh;
  // background: linear-gradient(to right, #00ecbc, #007adf) no-repeat;
  background-size: cover;
}
</style>
