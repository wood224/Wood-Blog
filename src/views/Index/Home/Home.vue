<template>
  <div class="home-wrapper">
    <div class="times">
      <el-card shadow="hover">
        <div class="time">
          <TimeCard></TimeCard>
        </div>
        <div class="data">
          <DateCard></DateCard>
        </div>
      </el-card>
    </div>
    <div class="count">
      <el-card shadow="hover">

      </el-card>
    </div>
    <div class="new-notes"></div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { getHomeInfo } from '../../../api/index';



getHomeInfo().then(res => {
  console.log(res.data);
})
</script>

<style scoped lang='scss'>
.home-wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 40% 60%;
  grid-template-columns: 50% 50%;
  grid-template-areas:
    "times count"
    "notes notes";

  ::v-deep(.el-card) {
    width: 100%;
    height: 100%;


    .el-card__body {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }


  .times {
    grid-area: times;

  }

  .count {
    grid-area: count;
  }

  .new-notes {
    grid-area: notes;
  }
}
</style>