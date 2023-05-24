<template>
  <div class="note-wrapper" v-if="note">
    <el-card class="head">
      <div class="title">
        <h1>{{ note.title }}</h1>
      </div>
      <div class="subtitle">
        {{ note.subtitle }}
      </div>
      <div class="category hover-action">
        分类：{{ note.category.name }}
      </div>
      <div class="tags">
        <div class="tag" v-for="tag in note.tags">
          <i class="fa fa-tag hover-action">{{ tag.name }}</i>
        </div>
      </div>
    </el-card>
    <el-card class="content">
      <v-md-preview ref="preview" :text="note.noteInfo.noteText"></v-md-preview>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getNoteInfoApi } from '../../../api';

const route = useRoute();

const id = computed(() => route.query.id);

const note = ref();
const getNoteInfo = () => {
  getNoteInfoApi(Number(id.value)).then(res => {
    const data = res.data;
    note.value = data;
    document.title = note.value.title;
  })
}
getNoteInfo();
</script>

<style scoped lang='scss'>
.note-wrapper {
  .head {
    margin-bottom: 20px;
    text-align: center;

    div {
      margin: 10px;
    }

    .subtitle {
      font-size: var(--subtitle-size);
      color: var(--subtitle-color);
    }

    .category {
      font-size: 20px;
    }
  }
}
</style>