<template>
  <div class="common-wrapper">
    <div class="wrapper-title">
      <h1>分类</h1>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="3" v-for="item in categoryList" :key="item.id">
          <div class="category hover-action" @click="openCategory(item.id)">
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
import { useRouter } from 'vue-router';

const BaseURL = import.meta.env.VITE_BASE_URL;
const router = useRouter();

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

const openCategory = (id: number) => {
  router.push({ path: 'categoryNote', query: { id: id } });
}
</script>

<style scoped lang='scss'>
.common-wrapper {
  text-align: center;

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