<template>
  <div class="info-wrapper animate__animated animate__zoomIn">
    <el-card shadow="hover">
      <div class="container">
        <div class="img">
          <img :src="BaseURL + info.avatar" alt="" />
        </div>
        <div class="name">
          <span>{{ info.name }}</span>
        </div>
        <div class="introduction">
          <span>{{ info.signature }}</span>
        </div>
        <div class="email">
          <i class="fa fa-envelope"></i> <span>{{ info.email }}</span>
        </div>
        <div class="count-list">
          <div class="count" v-for="(item, index) in countList" :key="index">
            <el-statistic :value="item.count">
              <template #title>
                {{ item.name }} <i class="fa" :class="item.icon"></i>
              </template>
            </el-statistic>
          </div>
        </div>
        <div class="btn-list">
          <button @click="openGit">
            <div class="github">
              <span class="iconfont icon-github"></span>
            </div>
          </button>
          <button>
            <div class="qq">
              <el-popover :width="300">
                <template #reference>
                  <span class="iconfont icon-QQ"></span>
                </template>
                <template #default>
                  <img :src="getAssets('Blog/QQ.jpg')" alt="">
                </template>
              </el-popover>
            </div>
          </button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useIndexStore } from '../../store';
import { getAllCountApi } from '../../api';
import { getAssets } from '../../util/getAssets';

const BaseURL = __BaseURL__;

const store = useIndexStore();
const router = useRouter();

const info = ref(store.info);

const getInfo = async () => {
  info.value = await store.setInfo();
}
getInfo();

const countList = ref([
  { name: '笔记', count: 0, icon: 'fa-file-code-o' },
  { name: '分类', count: 0, icon: 'fa-bars' },
  { name: '标签', count: 0, icon: 'fa-tag' }
])
const getAllCount = () => {
  getAllCountApi().then(res => {
    const data = res.data;
    countList.value = data.map((item: any, index: number) => {
      return {
        ...item,
        icon: countList.value[index].icon
      }
    });
  })
}
getAllCount();

const openGit = () => {
  window.open('https://github.com/wood224');
}
</script>

<style scoped lang='scss'>
.info-wrapper {
  position: relative;
  width: 100%;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .img {
      width: 100px;
      height: 100px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    .name {
      margin: 20px 0;
      font-size: 20px;
      font-weight: bold;
    }

    .introduction {
      margin-bottom: 20px;
      color: gray;
    }

    .count-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;

      .count {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;



        &:nth-child(2) {
          margin: 0 20px;
        }
      }
    }

    .btn-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 50%;
      font-size: 35px;


      span {
        display: block;
        border-radius: 50%;
      }

      .github {
        span {
          color: white;
          background-color: black;

          &:hover {
            color: black;
            background-color: white;
          }
        }
      }

      .qq {

        span {
          &:hover {
            color: white;
            background-color: #409EFF;
          }
        }
      }
    }
  }
}
</style>