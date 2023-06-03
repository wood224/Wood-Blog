<template>
  <div class="link-wrapper">
    <div class="wrapper-title">
      <h1>友链</h1>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8" v-for="item in linkList" :key="item.id">
          <div class="link" @click="openLink(item.link)">
            <el-card shadow="hover">
              <div class="left">
                <img :src="item.img" alt="暂无图片">
              </div>
              <div class="right">
                <div class="name text-ellipsis">
                  名称：{{ item.name }}
                </div>
                <div class="introduction text-ellipsis-two">
                  简介：{{ item.introduction }}
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="pages" v-if="count > pageOptions.limit">
      <el-card>
        <el-pagination background layout="prev, pager, next" :page-size="pageOptions.limit" :total="count"
          @current-change="handleCurrentChange" />
      </el-card>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue';
import { getLinkListApi } from '../../../api';
import { FriendLink } from '../../../types';

const BaseURL = import.meta.env.VITE_BASE_URL;

const pageOptions = reactive({
  limit: 12,
  offset: 0,
});
const count = ref(0);
const linkList = ref<FriendLink[]>();
const getLinkList = async (limit: number, offset: number) => {
  const { data } = await getLinkListApi({ limit, offset });
  count.value = data.count;
  linkList.value = data.friendLinkList.map((item: any) => {
    const img = item.img;
    const imgStr = img.includes('http://') || img.includes('https://') ? img : BaseURL + img;
    return {
      ...item,
      introduction: item.introduction === '' ? '暂无简介' : item.introduction,
      img: imgStr
    }
  })
}
getLinkList(pageOptions.limit, pageOptions.offset);

const openLink = (link: string) => {
  window.open(link);
}

//分页函数
const handleCurrentChange = (value: number) => {
  getLinkList(pageOptions.limit, (value - 1) * pageOptions.limit);
}

</script>

<style scoped lang='scss'>
.link-wrapper {
  .container {
    ::v-deep(.el-card) {
      margin-bottom: 20px;
      cursor: pointer;

      .el-card__body {
        display: flex;
        align-items: center;
      }
    }

    .left {
      margin-right: 20px;
      width: 70px;
      height: 70px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: contain;
        object-position: 50% 50%;
      }
    }

    .right {
      flex-shrink: 0;
    }
  }

  .pages {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
}
</style>