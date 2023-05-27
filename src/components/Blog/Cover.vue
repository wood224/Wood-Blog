<template>
  <div class="cover-wrapper">
    <div class="title">
      <div class="title-text" v-if="title">
        {{ title }}
      </div>
      <div class="detail" v-else-if="detail.categoryName || detail.tagName">
        <div class="name" v-if="detail.categoryName">
          分类名：{{ detail.categoryName }}
        </div>
        <div class="name" v-else-if="detail.tagName">
          标签名：{{ detail.tagName }}
        </div>
        <div class="introduction" v-if="detail.introduction">
          简介：{{ detail.introduction }}
        </div>
        <div class="time" v-if="detail.createTime">
          创建时间：{{ detail.createTime }}
        </div>
      </div>
    </div>
    <div class="bg-text" :style="{ backgroundPosition: textStyle }">
      <span>Wood</span>
    </div>
    <div class="daily">
      <AutoPrint :word="word"></AutoPrint>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, onMounted, ref, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getDailyWordApi, getCategoryInfoApi } from '../../api';
import { Word } from '../../types';
import { useIndexStore } from '../../store';

const store = useIndexStore();
const route = useRoute();

const detail = reactive(store.coverDetails)

const title = computed(() => {
  return route.meta.title;
})

const setDetail = () => {
  if (route.path.includes('categoryNote')) {
    getCategoryInfoApi(Number(route.query.id)).then(res => {
      const data = res.data;
      store.setCoverDetails(data.name, data.introduction, '', new Date(data.createTime).toLocaleDateString());
    })
  }
}
setDetail();

watch(title, () => {
  if (title.value !== '') return
  setDetail();
})

const word = ref(new Word());
const getDailyWord = () => {
  getDailyWordApi().then(res => {
    const data = res.data;
    const { hitokoto, from_who, from, type } = data;
    word.value.text = hitokoto;
    word.value.author = from_who ?? '';
    word.value.title = from ?? '';
    word.value.type = type;
  })
}
getDailyWord();

const textStyle = ref('');
onMounted(() => {
  document.addEventListener('scroll', () => {
    textStyle.value = window.scrollY === 0 ? '' : `calc(50% + ${scrollY}px) calc(50% + ${scrollY}px)`
  })
})
</script>

<style scoped lang='scss'>
.cover-wrapper {
  position: relative;
  width: 100%;
  text-align: center;
  padding-top: 70px;

  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 60px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(52, 52, 52, 0.6);
    font: bold 40px '';
    color: white;
    text-align: center;

    .title-text {
      margin-left: 20px;
      letter-spacing: 20px;
    }

    .detail {
      font-size: 2rem;

      .introduction {
        margin: 20px 0;
      }
    }
  }

  .bg-text {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url(../../assets/img/Blog/R-C.jpg);
    background-size: cover;
    background-position: 50% 50%;
    font: bold 30vw '';
    background-clip: text;
    -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    color: transparent;
    overflow: hidden;
    user-select: none;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -99;
      background-image: inherit;
      background-size: cover;
      background-position: 50% 50%;
    }
  }

  .daily {
    position: absolute;
    bottom: 8vh;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    min-height: 40px;
    border-radius: 10px;
    background-color: rgba(52, 52, 52, 0.6);
    color: white;
  }
}

@media screen and (max-width:768px) {}
</style>