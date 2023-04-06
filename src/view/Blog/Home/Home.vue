<template>
  <div class="home-wrapper">
    <Category></Category>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Category from '../../../components/Category.vue';
import { useRouter } from 'vue-router'
const router = useRouter();

</script>

<style scoped lang="scss">
.home-wrapper {
  height: 100%;
}
</style>