<template>
  <div class="home-wrapper">
    <Category></Category>
    <NoteList :count="count" :noteList="noteList"></NoteList>
    <div class="pages">
      <el-card>
        <el-pagination background layout="prev, pager, next" :page-size="6" :total="count"
          @current-change="handleCurrentChange" />
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import { getNoteListApi } from '../../../api'
import { useIndexStore } from '../../../store'

const router = useRouter();
const store = useIndexStore();

const count = ref(0);
const noteList = ref();
const pageOptions = reactive(store.pageOptions);
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

  .pages {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
}
</style>