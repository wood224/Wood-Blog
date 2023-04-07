<template>
  <div class="category-wrapper">
    category
  </div>
</template>

<script setup lang='ts'>
import { getCategory } from '../../../api/index';

getCategory().then(res => {
  console.log(res.data);
})
</script>

<style scoped lang='scss'></style>