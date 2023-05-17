<template>
  <div class="blog-wrapper">
    <Header></Header>
    <Cover></Cover>
    <Main></Main>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script setup lang="ts">
import { Header, Main } from './components/index'
</script>

<style lang="scss">
.blog-wrapper {
  min-height: 100vh;
  background-size: cover;
}
</style>
