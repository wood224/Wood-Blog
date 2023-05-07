<template>
  <div class="header-wrapper">
    <div class="left">Wood's Blog</div>
    <div class="right">
      <div class="btn">
        <div class="link-list">
          <template v-for="(item, index) in menuList" :key="index">
            <router-link class="link" :to="item.path" v-if="item.meta">
              <div class="icon" v-if="typeof (item.meta.icon) === 'string'">
                <i class="fa" :class="item.meta.icon"></i>
              </div>
              <span>{{ item.meta.title }}</span>
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const router = useRouter();

const menuList = computed(() => {
  if (router.options.routes[0] && router.options.routes[1].children)
    return [router.options.routes[0], ...router.options.routes[1].children];
});

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
  // z-index: 99;


  .left {
    font-family: 'STLiti';
    font-size: 50px;
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
  }
}

@media screen and (max-width:992px) {
  .header-wrapper {
    padding: 0;

    .left {
      font-size: 40px;
    }

    .right {
      display: none;
    }
  }
}
</style>