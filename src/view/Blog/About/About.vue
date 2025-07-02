<template>
  <div class="about-wrapper">
    <div class="wrapper-title">
      <h1>关于</h1>
    </div>
    <div class="container">
      <el-row :gutter="20" justify="space-between">
        <el-col :span="12" :xs=24 v-for="item in aboutList" :key="item.id">
          <HoverRotateCard>
            <div class="box">
              <div class="name">
                <h2>{{ item.name }}</h2>
              </div>
              <ul>
                <li v-for="info in item.aboutInfos" :key="info.id">
                  <div class="title">{{ info.title }}</div>
                  <div class="content">{{ info.content }}</div>
                </li>
              </ul>
            </div>
          </HoverRotateCard>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAboutListApi } from '../../../api';
import { About } from '../../../types';

const aboutList = ref<About[]>();
const getAboutList = () => {
  getAboutListApi().then(res => {
    const data = res.data;
    aboutList.value = data;
  })
}
getAboutList();
</script>

<style scoped lang="scss">
.about-wrapper {
  .container {

    .box {
      margin: 10px 0;
      padding: 20px;
      width: 100%;

      .name {
        text-align: center;
        margin-bottom: 20px;
      }

      li {
        display: flex;
        margin-bottom: 10px;

        .title {
          margin-right: 10px;
          width: 30%;
          font-weight: bold;
          text-align: right;
        }

        .content {
          width: 0;
          flex: 1;
          text-align: left;
        }
      }
    }
  }
}
</style>