<template>
  <div class="home-wrapper">

  </div>
</template>

<script setup lang='ts'>
import { getHomeInfo } from '../../../api/index';

getHomeInfo().then(res => {
  console.log(res.data);
})
</script>

<style scoped lang='scss'>
.home-wrapper {
  display: grid;
}
</style>