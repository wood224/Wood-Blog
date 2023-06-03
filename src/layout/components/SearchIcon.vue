<template>
  <div class="search-icon-wrapper">
    <div class="search" @click="setActive(true)">
      <el-icon :size="20">
        <Search />
      </el-icon>
    </div>
    <div class="ipt-wrapper" v-if="iptActive" @click="setActive(false)">
      <div class="ipt animate__animated animate__fadeInDown" @click.stop>
        <input type="text" v-model="searchText" @keyup.enter="search" placeholder="搜索标题...">
        <el-button class="search-btn" size="large" round @click="search">
          <el-icon color="#606266">
            <Search />
          </el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

const router = useRouter();

const iptActive = ref(false);
const setActive = (flag: boolean) => {
  iptActive.value = flag;
}

const searchText = ref('');
const search = () => {
  sessionStorage.setItem('searchText', searchText.value);
  router.push({ path: 'search', query: { text: searchText.value } });
  setActive(false);
}

</script>

<style scoped lang='scss'>
.search-icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: 0px 0px 2px gray;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 0px 5px gray;
    }
  }

  .ipt-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .5);
    transition: all 0.5s;
    overflow: hidden;

    .ipt {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 80%;
      height: 60px;
      background-color: white;
      border-radius: 60px;
      margin-top: 200px;
      padding: 10px 20px;
      color: black;
      font-size: 30px;
    }

    .search-btn {
      width: 40px;
      height: 40px;
    }
  }
}
</style>