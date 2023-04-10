<template>
  <div class="time-card-wrapper">
    <div class="card" v-for="(item, index) in timeArr" :key="index">
      <div class="num">{{ item }}</div>
      <span v-if="index != 2">:</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, toRefs } from 'vue';

const timeArr = ref<Array<string>>([]);
const hh = ref<string>();
const mm = ref<string>();
const ss = ref<string>();
function getTime() {
  timeArr.value.splice(0, timeArr.value.length);
  const now = new Date();
  hh.value = now.getHours() < 10 ? '0' + now.getHours() : '' + now.getHours();
  mm.value = now.getMinutes() < 10 ? '0' + now.getMinutes() : '' + now.getMinutes();
  ss.value = now.getSeconds() < 10 ? '0' + now.getSeconds() : '' + now.getSeconds();
  timeArr.value.push(hh.value);
  timeArr.value.push(mm.value);
  timeArr.value.push(ss.value);
}
getTime();
setInterval(getTime, 1000);

</script>

<style scoped lang='scss'>
.time-card-wrapper {
  display: flex;
  padding: 10px;

  .card {
    display: flex;
    align-items: center;
    line-height: 70px;
    font-size: 50px;
    font-family: 'Arial';

    .num {
      padding: 10px;
      background-color: #0E0E0E;
      text-align: center;
      color: white;
    }

    span {
      margin: 06px;
    }
  }
}
</style>