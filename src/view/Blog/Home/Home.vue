<template>
  <div class="home-wrapper">
    <div class="container">
      <div class="wrapper-title">
        <h1>总览</h1>
      </div>
      <div class="content">
        <div class="note-list">
          <NoteList :noteList="noteList"></NoteList>
        </div>
        <div class="info">
          <Info></Info>
        </div>
      </div>
      <div class="pages">
        <el-card>
          <el-pagination background layout="prev, pager, next" :page-size="6" :total="count"
            @current-change="handleCurrentChange" />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { getNoteListApi } from '../../../api'

const count = ref(0);
const noteList = ref();
const pageOptions = reactive({
  limit: 6,
  offset: 0,
});
const getNoteList = (limit: number, offset: number) => {
  getNoteListApi({ limit, offset }).then(res => {
    const data = res.data;
    count.value = data.count;
    noteList.value = data.noteList.map((note: any) => {
      return {
        id: note.id,
        title: note.title,
        subtitle: note.subtitle,
        createTime: note.createTime,
        updateTime: note.updateTime,
        tags: note.tags.map((tag: any) => {
          return {
            id: tag.id,
            name: tag.name
          }
        }),
        category: {
          id: note.category.id,
          name: note.category.name,
          introduction: note.category.categoryInfo.introduction,
          coverImg: note.category.categoryInfo.coverImg
        }
      }
    });
  })
}
getNoteList(pageOptions.limit, pageOptions.offset);

//分页函数
const handleCurrentChange = (value: number) => {
  getNoteList(pageOptions.limit, (value - 1) * pageOptions.limit);
}

</script>

<style scoped lang="scss">
.home-wrapper {
  height: 100%;

  .container {
    width: 100%;

    .content {
      display: flex;

      .note-list {
        flex: 1;
        margin-right: 10px;
        width: 80%;
      }

      .info {
        width: 300px
      }
    }

    .pages {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
    }
  }
}

@media screen and (max-width:992px) {
  .home-wrapper {
    .content {
      flex-direction: column-reverse;
      align-items: center;

      .note-list {
        width: 100% !important;
      }

      .info {
        margin-bottom: 20px;
      }
    }
  }
}
</style>