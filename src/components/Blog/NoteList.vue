<template>
  <div class="note-list-wrapper">
    <el-card v-if="noteList.length !== 0" class="animate__animated animate__zoomIn" shadow="hover"
      v-for="item in noteList" :key="item.id">
      <div class="note" @click="openNote(item.id)">
        <div class="img">
          <img :src="BaseURL + item.category.coverImg" alt="">
        </div>
        <div class="info">
          <div class="head">
            <div class="title hover-action" :title="item.title" @click.stop="openNote(item.id)">{{ item.title }}</div>
            <div class="subtitle " :title="item.subtitle">{{ item.subtitle }}</div>
          </div>
          <div class="category hover-action" @click.stop="openCategory(item.category.id)">
            <i class="fa fa-bars">&nbsp;{{ item.category.name }}</i>
          </div>
          <div class="date">
            <i class="fa fa-calendar">&nbsp;{{ item.createTime }}</i>
          </div>
          <div class="tags">
            <div class="tag " v-for="tag in item.tags" :key="tag.id">
              <i class="fa fa-tag">{{ tag.name }}</i>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-empty v-else description="这里什么都没有哦" />
  </div>
</template>

<script setup lang='ts'>
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';

const BaseURL = import.meta.env.VITE_BASE_URL;

const router = useRouter();

const props = defineProps({
  noteList: {
    type: Array<any>,
    require: true,
    default: []
  }
})

const { noteList } = toRefs(props)

const openNote = (id: number) => {
  router.push({ path: 'note', query: { id: id } });
}

const openCategory = (id: number) => {
  router.push({ path: 'categoryNote', query: { id: id } });
}
</script>

<style scoped lang='scss'>
.note-list-wrapper {
  width: 100%;

  .note {
    display: flex;
    width: 100%;
    cursor: pointer;

    .img {
      flex-shrink: 0;
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
      width: 0;
      flex: 1;
      height: 100%;
      line-height: 30px;

      .head {
        display: flex;
        align-items: center;
        width: 100%;

        div {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .title {
          margin-right: 20px;
          font-size: var(--title-size);
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

@media screen and (max-width:992px) {
  .note-list-wrapper {
    .note {
      .img {
        display: none;
      }

      .info {
        .head {
          .subtitle {
            display: none;
          }
        }
      }
    }
  }
}
</style>