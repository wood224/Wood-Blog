<template>
  <div class="header-wrapper">
    <div class="left">
      <img src="/WoodBlogLogo.svg" alt="">
      Wood Blog
    </div>
    <div class="right">
      <div class="btn">
        <div class="link-list">
          <template v-for="(item, index) in menuList" :key="index">
            <router-link class="link" :to="item.path" v-if="item.meta && item.meta.hidden !== true">
              <div class="icon" v-if="typeof (item.meta.icon) === 'string'">
                <i class="fa" :class="item.meta.icon"></i>
              </div>
              <span>{{ item.meta.title }}</span>
            </router-link>
          </template>
        </div>
      </div>

      <div class="nav">
        <div class="nav-open" @click="drawer = true">
          <i class="fa fa-ellipsis-v"></i>
        </div>
        <el-drawer v-model="drawer" title="导航" direction="ttb">
          <div class="nav-list">
            <template v-for="(item, index) in menuList" :key="index">
              <router-link class="link" :to="item.path" v-if="item.meta && item.meta.hidden !== true"
                @click="clickDrawer">
                <div class="icon" v-if="typeof (item.meta.icon) === 'string'">
                  <i class="fa" :class="item.meta.icon"></i>
                </div>
                <span>{{ item.meta.title }}</span>
              </router-link>
            </template>
          </div>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter();

const menuList = computed(() => {
  if (router.options.routes[0] && router.options.routes[1].children)
    return [router.options.routes[0], ...router.options.routes[1].children];
});

const drawer = ref(false);
const clickDrawer = () => {
  drawer.value = false;
}

</script>

<style scoped lang="scss">
.header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 200px;
  width: 100%;
  height: 70px;
  background-color: white;
  box-shadow: 0 0 10px black;
  z-index: 99;


  .left {
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 50px;
    font-family: 'STLiti';
    cursor: default;

    img {
      height: 90%;
      object-fit: contain;
    }
  }

  .right {
    display: flex;
    align-items: center;
    height: 100%;

    .btn {
      display: flex;
      font-size: 18px;
      height: 100%;

      .link-list {
        display: flex;
        align-items: center;
        height: 100%;

        .link {
          margin-right: 20px;
          position: relative;
          display: flex;
          align-items: center;
          height: 80%;
          text-align: center;
          cursor: pointer;

          .icon {
            margin-right: 4px;
            font-size: 18px;
          }

          &:hover {
            color: var(--ty-blue);

            &::after {
              bottom: 4px;
              opacity: 1;
            }
          }

          &::after {
            content: '';
            position: absolute;
            z-index: 100;
            left: 0;
            bottom: -4px;
            width: 100%;
            height: 3px;
            opacity: 0;
            transition: .2s;
            background-color: var(--ty-blue);
          }
        }
      }
    }

    .nav {
      display: none;
      font-size: 30px;
      height: 100%;
      text-align: center;

      .nav-open {
        width: 50px;
      }

      &:active {
        background-color: rgb(160, 160, 160);
      }

      .nav-list {
        .link {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
          width: 100%;
          font-size: 20px;

          &+.link {
            padding-top: 10px;
            border-top: 1px solid gray;
          }

          .icon {
            margin-right: 10px;
          }
        }
      }
    }
  }
}

@media screen and (max-width:1200px) and (min-width: 992px) {
  .header-wrapper {
    padding: 0 100px;
  }
}

@media screen and (max-width:992px) {
  .header-wrapper {
    padding: 0;

    .left {
      font-size: 40px;
    }

    .right {
      .btn {
        display: none;
      }

      .nav {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>