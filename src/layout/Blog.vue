<template>
  <div class="blog-wrapper">
    <Header></Header>
    <Cover></Cover>
    <div class="main">
      <Main></Main>
    </div>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script setup lang="ts">
import { Header, Main } from './components/index'
</script>

<style lang="scss">
.blog-wrapper {
  position: relative;
  min-height: 100vh;
  background-size: cover;

  .main {
    width: 100%;
    // background-color: #e6f4fb;
  }
}
</style>
