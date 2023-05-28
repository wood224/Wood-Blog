<template>
  <div class="hover-rotate-card-wrapper">
    <div class="extent" @mousemove="HandlerMouseMove" @mouseleave="HandlerMouseLeave">
      <div class="card" ref="card">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

const multiple = 8;
const card = ref();
const HandlerMouseMove = (e: MouseEvent) => {
  const box = card.value.getBoundingClientRect();

  const calcX = (e.clientY - box.y - (box.height / 2)) / multiple;
  const calcY = (e.clientX - box.x - (box.width / 2)) / multiple;

  card.value.style.transition = `transform 0s`;
  card.value.style.transform = `rotateX(${-calcX}deg) rotateY(${calcY}deg)`;
}
const HandlerMouseLeave = () => {
  card.value.style.transition = `transform 1s`;
  card.value.style.transform = `rotateX(0) rotateY(0)`;
}
</script>

<style scoped lang='scss'>
.hover-rotate-card-wrapper {
  padding: 0 20px;

  .extent {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    perspective: 1000px;


    .card {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      transform-style: preserve-3d;
      transform: rotateX(0) rotateY(0);
      box-shadow: var(--el-box-shadow-light);
      // transition: transform .1s;
    }
  }
}
</style>