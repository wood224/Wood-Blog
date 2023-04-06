<template>
  <div class="category-wrapper">
    <div class="title" @click="development">
      <h2>分类列表</h2>
      <div class="arrow" :style="{ transform: isDevelopment ? 'rotate(-90deg)' : 'rotate(0deg)' }">
        <i class="fa fa-chevron-left"></i>
      </div>
    </div>
    <el-scrollbar>
      <div class="list" :style="{ 'max-height': isDevelopment ? '132px' : '0' }">
        <ul>
          <li v-for="(item, index) in list" :key="item.id">
            <div class="menu">
              <el-button type="primary" plain>
                {{ item.name }}
              </el-button>
            </div>
          </li>
          <li v-for=" index in 15" :key="index" style="margin: 0;height: 0;">
            <div class="menu"></div>
          </li>
        </ul>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface menu {
  id: number,
  name: string,
}
const list = ref<menu[]>([]);
const arr = [
  {
    id: 0,
    name: '全部'
  },
  {
    id: 1,
    name: 'vue'
  }, {
    id: 2,
    name: 'JavaScript'
  }, {
    id: 3,
    name: 'CSS'
  }, {
    id: 4,
    name: 'HTML'
  }, {
    id: 1,
    name: 'vue'
  }, {
    id: 2,
    name: 'JavaScript'
  }, {
    id: 3,
    name: 'CSS'
  }, {
    id: 4,
    name: 'HTML'
  }, {
    id: 1,
    name: 'vue'
  }, {
    id: 2,
    name: 'JavaScript'
  }, {
    id: 3,
    name: 'CSS'
  }, {
    id: 4,
    name: 'HTML'
  }, {
    id: 1,
    name: 'vue'
  }, {
    id: 2,
    name: 'JavaScript'
  }, {
    id: 3,
    name: 'CSS'
  }, {
    id: 4,
    name: 'HTML'
  }, {
    id: 0,
    name: '全部'
  },
  {
    id: 1,
    name: 'vue'
  }, {
    id: 2,
    name: 'JavaScript'
  }, {
    id: 3,
    name: 'CSS'
  }, {
    id: 4,
    name: 'HTML'
  }, {
    id: 1,
    name: 'vue'
  }, {
    id: 2,
    name: 'JavaScript'
  }, {
    id: 3,
    name: 'CSS'
  }, {
    id: 4,
    name: 'HTML'
  }, {
    id: 1,
    name: 'vue'
  }, {
    id: 2,
    name: 'JavaScript'
  }, {
    id: 3,
    name: 'CSS'
  }, {
    id: 4,
    name: 'HTML'
  }, {
    id: 1,
    name: 'vue'
  }, {
    id: 2,
    name: 'JavaScript'
  }, {
    id: 3,
    name: 'CSS'
  }, {
    id: 4,
    name: 'HTML'
  }
]
arr.forEach((item) => {
  return list.value.push(item);
})

const isDevelopment = ref(false);
const development = () => {
  isDevelopment.value = !isDevelopment.value;
}

</script>

<style lang="scss" scoped>
.category-wrapper {
  margin-bottom: 40px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: rgba($color: #FFFFFF, $alpha: 0.5);

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;

    .arrow {
      width: 40px;
      height: 100%;
      text-align: center;
      line-height: 40px;
      transition: .5s;
      cursor: pointer;
    }
  }

  .list {
    max-height: 0;
    transition: .5s;

    ul {
      display: flex;
      flex-wrap: wrap;
      flex-shrink: 0;
      justify-content: space-between;

      &::after {
        content: '';
        flex: 1;
      }

      li {
        margin: 6px 0;
        width: 120px;

        &:last-child {
          margin-right: auto;
        }

        .menu {
          margin: 0 auto;
          width: 100px;

          ::v-deep(.el-button) {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>