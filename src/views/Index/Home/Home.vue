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
        <div class="category-pie" ref="categoryPieRef"></div>
      </el-card>
    </div>
    <div class="new-notes"></div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { getHomeInfoApi, getCategoryNoteCountApi } from '../../../api/index';
import * as echarts from 'echarts';

const categoryPieData = ref();
const categoryPieRef = ref();
const setCategoryPie = () => {
  getCategoryNoteCountApi().then(res => {
    const data = res.data;
    categoryPieData.value = data;
    const pieChart = echarts.init(categoryPieRef.value);
    pieChart.setOption({
      series: [
        {
          label: {
            formatter: '{b}: {c}篇 ({d}%)'
          },
          type: 'pie',
          data: categoryPieData.value.map((item: any) => {
            return {
              name: item.name,
              value: item.count
            }
          })
        }
      ]
    });
  })

}



getHomeInfoApi().then(res => {
  console.log(res.data);
})

onMounted(() => {
  setCategoryPie();
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

    .category-pie {
      width: 100%;
      height: 100%;
    }
  }

  .new-notes {
    grid-area: notes;
  }
}
</style>