<template>
  <div class="category-note-wrapper">
    <div class="wrapper-title">
      <h1>{{ categoryName }}下的笔记总览</h1>
    </div>
    <div class="content">
      <div class="note-list">
        <NoteList :noteList="noteList"></NoteList>
      </div>
    </div>
    <div class="pages">
      <el-card>
        <el-pagination background layout="prev, pager, next" :page-size="6" :total="count"
          @current-change="handleCurrentChange" />
      </el-card>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, onActivated, reactive, ref } from 'vue';
import { searchNoteListApi } from '../../../api';
import { useRoute } from 'vue-router';

const route = useRoute();

const id = computed(() => route.query.id);

const count = ref(0);
const noteList = ref()
const pageOptions = reactive({
  limit: 6,
  offset: 0,
});
const categoryName = ref('');
const searchNoteList = (limit: number, offset: number) => {
  searchNoteListApi({ title: '', limit, offset, categoryId: id.value }).then(res => {
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
    categoryName.value = noteList.value[0].category.name;
  })
}

//分页函数
const handleCurrentChange = (value: number) => {
  searchNoteList(pageOptions.limit, (value - 1) * pageOptions.limit);
}

onActivated(() => {
  searchNoteList(pageOptions.limit, pageOptions.offset);
})
</script>

<style scoped lang='scss'>
.category-note-wrapper {

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
</style>