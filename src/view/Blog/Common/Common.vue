<template>
  <div class="common-wrapper">
    <div class="title">
      <h1>分类</h1>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="3" v-for="item in categoryList" :key="item.id">
          <div class="category hover-action">
            <el-card shadow="hover">
              <div class="img">
                <img :src="item.coverImg" alt="">
              </div>
              <div class="name" :title="item.name">
                <el-text truncated>{{ item.name }}</el-text>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { getCategoryListApi } from '@/api';
import { AxiosResponse } from 'axios';
import { getAssets } from '../../../util/getAssets';

const BaseURL = __BaseURL__;

const categoryList = ref();
const getCategoryList = () => {
  getCategoryListApi().then((res: AxiosResponse) => {
    const data = res.data;
    categoryList.value = data.map((item: any) => {
      const coverImg = item.coverImg;
      return {
        ...item,
        coverImg: coverImg === '' ? getAssets('default/defaultCategory.png') : BaseURL + coverImg
      }
    });
  })
}

getCategoryList();
</script>

<style scoped lang='scss'>
.common-wrapper {
  margin: 0 auto;
  text-align: center;

  .title {
    margin-bottom: 20px;
  }

  .container {
    .category {
      margin: 10px 0;

      ::v-deep(.el-card) {
        // width: 100%;

        .el-card__body {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }

      .img {
        width: 70px;
        height: 70px;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .name {
        width: 100%;
      }
    }
  }
}
</style>