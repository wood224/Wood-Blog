<template>
  <div class="dark-switch-wrapper" :class="{ 'is-dark': dark }" @click="switchDark">
    <div class="switch">
      <i class="fa" :class="[dark ? 'fa-moon-o' : 'fa-sun-o']"></i>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDark, useToggle } from '@vueuse/core';
import { useIndexStore } from '../../store';

const store = useIndexStore();

const dark = useDark();
store.setIsDark(dark.value)

const switchDark = () => {
  dark.value = !dark.value;
  store.setIsDark(dark.value)
  useToggle(dark);
}
</script>

<style scoped lang='scss'>
.dark-switch-wrapper {
  position: relative;
  width: 50px;
  height: 24px;
  background-color: #dcdfe6;
  border-radius: 24px;
  cursor: pointer;

  &.is-dark {
    background-color: #2c2c2c;

    .switch {
      left: calc(100% - 20px - 2px);
    }
  }

  .switch {
    position: absolute;
    top: 50%;
    left: 2px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-color: var(--el-bg-color);
    border-radius: 50%;
    transition: all 0.5s;
    line-height: 20px;
    text-align: center;
    font-size: 14px;
  }
}
</style>