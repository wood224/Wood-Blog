<template>
  <div class="menus-wrapper">
    <div class="title">
      <span>Wood's Blog</span>
    </div>
    <div class="list">
      <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse" unique-opened>
        <template v-for="(item, index) in menuList" :key="index">
          <template v-if="item.meta">
            <el-sub-menu v-if="item.children" :index="`${index}`">
              <template #title>
                <router-link class="link" :to="'/' + item.path" v-if="item.meta">
                  <div class="icon" v-if="typeof (item.meta.icon) === 'string'">
                    <i class="fa" :class="item.meta.icon"></i>
                  </div>
                  <span>{{ item.meta.title }}</span>
                </router-link>
              </template>
              <el-menu-item v-for="(child, childIndex) in item.children" :key="childIndex"
                :index="`${index}-${childIndex}`">
                <template #title>
                  <router-link class="link" :to="`/${item.path}/${child.path}`" v-if="child.meta">
                    <div class="icon" v-if="typeof (child.meta.icon) === 'string'">
                      <i class="fa" :class="child.meta.icon"></i>
                    </div>
                    <span>{{ child.meta.title }}</span>
                  </router-link>
                </template>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="`${index}`">
              <template #title>
                <router-link class="link" :to="'/' + item.path" v-if="item.meta">
                  <div class="icon" v-if="typeof (item.meta.icon) === 'string'">
                    <i class="fa" :class="item.meta.icon"></i>
                  </div>
                  <span>{{ item.meta.title }}</span>
                </router-link>
              </template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const test = () => {
  router.push('/home');
}

const menuList = computed(() => {
  if (router.options.routes[0].children) {
    return [...router.options.routes[0].children]
  }
});
console.log(menuList.value);



const isCollapse = ref(false);

</script>

<style scoped lang='scss'>
.menus-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
  height: 100%;
  background-color: #011528;
  text-align: center;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    font-family: 'STLiti';
    font-size: 40px;
    color: white;

    span {
      display: block;
      padding: 6px;
      border-radius: 20px;
      background-color: #348EED;
    }
  }

  .list {
    width: 100%;

    .link {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      text-align: center;
      cursor: pointer;

      .icon {
        display: flex;
        align-items: center;
        margin-right: 10px;
        font-size: 20px;
      }
    }
  }
}
</style>