<template>
  <div class="note-list-wrapper">
    <el-card shadow="hover" v-for="item in noteList" :key="item.id">
      <div class="note">
        <div class="img">
          <img :src="BaseURL + item.category.coverImg" alt="">
        </div>
        <div class="info">
          <div class="head">
            <div class="title hover-action" :title="item.title">{{ item.title }}</div>
            <div class="subtitle" :title="item.subtitle">{{ item.subtitle }}</div>
          </div>
          <div class="category hover-action">
            <i class="fa fa-bars ">&nbsp;{{ item.category.name }}</i>
          </div>
          <div class="date">
            <i class="fa fa-calendar">&nbsp;{{ item.createTime }}</i>
          </div>
          <div class="tags">
            <div class="tag " v-for="tag in item.tags" :key="tag.id">
              <i class="fa fa-tag hover-action">{{ tag.name }}</i>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, toRefs } from 'vue';

const BaseURL = __BaseURL__;

const props = defineProps({
  count: {
    type: Number,
    require: true,
    default: 0
  },
  noteList: {
    type: Array<any>,
    require: true,
    default: []
  }
})

const { count, noteList } = toRefs(props)
onMounted(() => {

})

</script>

<style scoped lang='scss'>
.note-list-wrapper {
  width: 100%;

  .note {
    display: flex;

    .img {
      margin-right: 20px;
      width: 120px;
      height: 120px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .info {
      flex: 1;
      height: 100%;
      line-height: 30px;

      .head {
        display: flex;
        align-items: center;


        div {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .title {
          margin-right: 20px;
          font-size: var(--title-size);
          color: var(--title-color);
          font-weight: var(--title-font-weight);

        }

        .subtitle {
          font-size: var(--subtitle-size);
          color: var(--subtitle-color);
        }
      }

      .date {
        color: rgb(188, 188, 188);
      }

      .tags {
        display: flex;

        .tag {
          i {
            color: gray;
          }

          &+.tag {
            margin-left: 10px;
          }
        }
      }
    }
  }
}

::v-deep(.el-card) {
  &+.el-card {
    margin-top: 10px;
  }
}
</style>