<template>
  <div class="menus-wrapper">
    <div class="list">
      <el-menu default-active="1" class="el-menu-vertical-demo" :unique-opened="false" :collapse="isCollapse">
        <template v-for="(item, index) in menuList" :key="index">
          <el-sub-menu v-if="item.children" :index="`${index}`">
            <template #title>
              <span class="link" v-if="item.meta">
                <div class="icon" v-if="typeof (item.meta.icon) === 'string'">
                  <i class="fa" :class="item.meta.icon"></i>
                </div>
                <span>{{ item.meta.title }}</span>
              </span>
            </template>
            <el-menu-item v-for="(child, childIndex) in item.children" :key="childIndex"
              :index="`${index}-${childIndex}`">
              <template #title>
                <router-link :to="`/${item.path}/${child.path}`" class="link" v-if="child.meta">
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
              <router-link :to="'/' + item.path" class="link">
                <div class="icon" v-if="typeof (item.meta?.icon) === 'string'">
                  <i class="fa" :class="item.meta?.icon"></i>
                </div>
                <span>{{ item.meta?.title }}</span>
              </router-link>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const menuList = computed(() => {
  if (router.options.routes[0].children) {
    return [...router.options.routes[0].children]
  }
});

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