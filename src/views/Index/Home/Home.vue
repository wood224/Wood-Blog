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
        <h1>各标题下笔记数量top5</h1>
        <div class="category-pie" ref="categoryPieRef"></div>
      </el-card>
    </div>
    <div class="new-notes">
      <el-card shadow="hover">
        <h1>5日内新增笔记数量</h1>
        <div class="notes-line" ref="NotesLineRef"></div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onActivated, onMounted, ref } from 'vue';
import { getCategoryNoteCountApi, newNotesApi } from '../../../api/index';
import * as echarts from 'echarts';
import { onBeforeRouteLeave } from 'vue-router';

const categoryPieData = ref();
const categoryPieRef = ref();
let pieChart: any;
const setCategoryPie = () => {
  getCategoryNoteCountApi().then(res => {
    const data = res.data;
    categoryPieData.value = data;
    pieChart = echarts.init(categoryPieRef.value);
    pieChart.setOption({
      series: [
        {
          label: {
            fontSize: 16,
            formatter: '{b}: {c}篇 ({d}%)',
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

const NotesLineData = ref();
const NotesLineRef = ref();
let lineChart: any;
const setNotesLine = () => {
  newNotesApi().then(res => {
    const data = res.data;
    NotesLineData.value = data;
    lineChart = echarts.init(NotesLineRef.value);
    lineChart.setOption({
      tooltip: {
        trigger: 'axis',
        valueFormatter: (value: any) => value + '篇'
      },
      xAxis: {
        data: NotesLineData.value.map((item: any) => {
          return item.date;
        })
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: NotesLineData.value.map((item: any) => {
            return item.count;
          }),
          type: 'line'
        }
      ]
    })
  })
}

onActivated(() => {
  setCategoryPie();
  setNotesLine();
})

onBeforeRouteLeave(() => {
  if (lineChart)
    lineChart.dispose();
  if (pieChart)
    pieChart.dispose();
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
    margin-right: 5px;

  }

  .count {
    grid-area: count;
    margin-left: 5px;

    .category-pie {
      flex: 1;
      width: 100%;
    }
  }

  .new-notes {
    grid-area: notes;
    margin-top: 10px;

    .notes-line {
      width: 100%;
      flex: 1;
    }
  }
}
</style>