<template>
  <div class="date-card-wrapper">
    <span>{{ date }}</span>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

const date = ref('');
function getWeek(num: number) {
  switch (num) {
    case 0:
      return ' 周日';
    case 1:
      return '周一';
    case 2:
      return '周二';
    case 3:
      return '周三';
    case 4:
      return '周四';
    case 5:
      return '周五';
    case 6:
      return '周六';
  }
}

function getTime() {
  const now = new Date();
  date.value = now.toLocaleDateString();
  date.value += getWeek(now.getDay());
}
getTime();
setInterval(getTime, 1000);
</script>

<style scoped lang='scss'>
.date-card-wrapper {
  font-size: 30px;
}
</style>