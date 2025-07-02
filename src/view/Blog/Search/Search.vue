<template>
  <div class="search-wrapper">
    <div class="wrapper-title">
      <h1>搜索</h1>
    </div>
    <div class="container">
      <div class="radio-group">
        <el-radio-group v-model="conditionType" @change="HandlerChange">
          <el-radio :label="1" size="large" border>按分类搜索</el-radio>
          <el-radio :label="2" size="large" border>按标签搜索</el-radio>
        </el-radio-group>
      </div>

      <div class="ipt">
        <el-input v-model="searchText" placeholder="搜索笔记标题"
          @keydown.enter="searchNoteList(searchText, pageOptions.limit, pageOptions.offset, conditionSelect)">
          <template #prepend>
            <el-select v-model="conditionSelect" placeholder="Select" style="width: 150px">
              <el-option v-for="item in conditionList" :label="item.name" :value="item.id">
                <div class="category">
                  <img :src="item.coverImg" alt="" v-if="conditionType === 1 && item.coverImg">
                  <span>{{ item.name }}</span>
                </div>
              </el-option>
            </el-select>
          </template>
          <template #append><el-button :icon="Search"
              @click="searchNoteList(searchText, pageOptions.limit, pageOptions.offset, conditionSelect)" /></template>
        </el-input>
      </div>
      <NoteList :noteList="noteList"></NoteList>
    </div>

    <div class="pages">
      <el-card>
        <el-pagination background layout="prev, pager, next" :page-size="pageOptions.limit" :total="count"
          @current-change="handleCurrentChange" />
      </el-card>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Search } from '@element-plus/icons-vue';
import { searchNoteListApi, getCategoryListApi, getTagListApi } from '../../../api';

const BaseURL = import.meta.env.VITE_BASE_URL;
const route = useRoute();

const searchText = ref(route.query.text?.toString());

//获取分类列表
const categoryList = ref();
const getCategoryList = async () => {
  await getCategoryListApi().then(res => {
    const data = res.data;
    categoryList.value = [{ id: 0, name: '全部分类', coverImg: '' }]
    const temp = data.map((item: any) => {
      const coverImg = item.coverImg;
      return {
        ...item,
        coverImg: coverImg === '' ? '' : BaseURL + coverImg
      }
    });
    categoryList.value.push(...temp);
  });
}

//获取标签列表
const tagList = ref();
const getTagList = async () => {
  await getTagListApi().then(res => {
    const data = res.data;
    tagList.value = [{ id: 0, name: '全部标签' }]
    tagList.value.push(...data);
  })
}

//选择器
const conditionType = ref(1)      // 1：分类  2：标签
const conditionSelect = ref(0);
const conditionList = ref();
const HandlerChange = async (value: string | number | boolean) => {
  conditionList.value = [];
  if (value === 1) {
    if (!categoryList.value) {
      await getCategoryList();
    }
    conditionList.value = categoryList.value;
  } else {
    if (!tagList.value) {
      await getTagList();
    }
    conditionList.value = tagList.value;
  }
}
HandlerChange(conditionType.value);

const count = ref(0);
const noteList = ref();
const pageOptions = reactive({
  limit: 6,
  offset: 0,
});
const searchNoteList = async (title: string | undefined, limit: number, offset: number, conditionId?: number) => {
  const id = conditionId === 0 ? null : conditionId;
  let resData;
  if (conditionType.value === 1) {
    const { data } = await searchNoteListApi({ title, limit, offset, categoryId: id });
    resData = data;
  }
  else {
    const { data } = await searchNoteListApi({ title, limit, offset, tagIds: [id] })
    resData = data;
  }
  count.value = resData.count;
  noteList.value = resData.noteList.map((note: any) => {
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
}
searchNoteList(searchText.value, pageOptions.limit, pageOptions.offset);

//分页函数
const handleCurrentChange = (value: number) => {
  pageOptions.offset = (value - 1) * pageOptions.limit;
  searchNoteList(searchText.value, pageOptions.limit, pageOptions.offset);
}
</script>

<style scoped lang='scss'>
.search-wrapper {
  .container {

    .radio-group {
      display: flex;
      justify-content: center;
    }

    .ipt {
      margin: 20px 0;
    }
  }

  .pages {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
}

.el-select-dropdown__item {
  padding: 10px;
  box-sizing: content-box;

  .category {
    display: flex;
    align-items: center;
    height: 30px;

    img {
      width: 30px;
      margin-right: 8px;
      height: 100%;
      object-fit: contain;
    }

    span {
      flex: 1;
    }
  }
}
</style>