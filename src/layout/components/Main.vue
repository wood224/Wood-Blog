<template>
  <div class="main-wrapper">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.main-wrapper {
  margin: 0 auto;
  padding: 30px 0;
  width: 70%;
  height: calc(100% - 70px);
}

@media screen and (max-width:992px) {
  .main-wrapper {
    width: 90%;
  }
}
</style>