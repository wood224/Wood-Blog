<template>
  <div class="menu-view-wrapper">
    <div class="title">
      <h1>{{ title }}</h1>
    </div>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { toRefs } from 'vue';

const props = defineProps({
  title: {
    type: String,
    require: true,
  }
})

const { title } = toRefs(props);
</script>

<style scoped lang='scss'>
.menu-view-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #EFF0F4;

  .container {
    margin-top: 20px;
    flex: 1;
  }
}
</style>