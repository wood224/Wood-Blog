<template>
  <div>
    <h1 @click="go">About</h1>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter();
const go = () => {
  router.push('/home');
}
</script>

<style scoped lang="scss"></style>