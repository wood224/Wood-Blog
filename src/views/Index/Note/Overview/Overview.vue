<template>
  <MenuView>
    <div class="overview-wrapper">
      <div class="top">
        <div class="search">
          <div class="ipt">
            <el-input v-model="searchText" class="w-50 m-2" size="large" placeholder="搜索笔记名" :prefix-icon="Search"
              maxlength="10" show-word-limit clearable @keyup.enter="searchNote(pageOptions.limit)" />
          </div>
          <div class="btn">
            <el-button @click="searchNote(pageOptions.limit)">搜索</el-button>
          </div>
        </div>
        <div class="btn">
          <el-button type="success" :icon="Plus" @click="editorNote(1)">新增</el-button>
        </div>
      </div>
      <div class="container">
        <el-table :data="noteList.list" border stripe height="100%">
          <el-table-column type="index" width="50" />
          <el-table-column label="标题" prop="title" />
          <el-table-column label="分类">
            <template #default="scope">
              <span class="category-text">{{ scope.row.category.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Tag">
            <template #default="scope">
              <el-tag v-for="item in scope.row.tags" disable-transitions>
                {{ item.name }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createTime" />
          <el-table-column label="更新时间" prop="updateTime" />
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <div>
                <el-button size="small" type="primary"
                  @click="editorNote(2, scope.row.id, scope.row.title)">编辑</el-button>
                <el-button size="small" type="danger" @click="removeNote(scope.row.id, scope.row.title)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pages">
        <el-pagination layout="prev, pager, next" :current-page="(pageOptions.offset / 10) + 1" :total="noteList.count"
          @current-change="currentChange" />
      </div>
    </div>
  </MenuView>
</template>

<script setup lang='ts'>
import { onActivated, onMounted, reactive, ref } from 'vue';
import { getNoteListApi, deleteNoteApi, searchNoteApi } from '@/api/index';
import { Search, Plus } from '@element-plus/icons-vue'
import { NoteList } from '@/types/NoteType';
import { useIndexStore } from '@/store'
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useIndexStore();

const searchText = ref('');

//获取笔记列表
const noteList = ref(new NoteList());
const pageOptions = reactive(store.pageOptions);
const getNoteList = (limit: number = pageOptions.limit, offset: number = 0) => {
  getNoteListApi({ limit: limit, offset: offset }).then(res => {
    const data = res.data;
    noteList.value.count = data.count;
    noteList.value.list = data.noteList;
  })
}

//编辑笔记
const editorNote = (type: number, id?: number, title?: string) => {
  store.setIsEditor(true, type, id);
  router.push({ path: '/note/editor', query: { type: type, id: id } });
}

//删除分类
const removeNote = (id: number, name: string) => {
  ElMessageBox.confirm(`确认删除笔记 《${name}》 吗？`, '提示', {
    confirmButtonText: '确认删除',
    confirmButtonClass: 'confirm-remove-button',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      deleteNoteApi(id).then(res => {
        const data = res.data;
        if (data.code === 200) {
          getNoteList();
        }
      });
    })
    .catch(() => { })
}

//搜索笔记
const searchNote = (limit: number = pageOptions.limit, offset: number = 0) => {
  pageOptions.offset = offset;  //搜索时重置页数(偏移量)
  if (searchText.value === '') return getNoteList(limit, 0);
  searchNoteApi({ title: searchText.value, limit: limit, offset: offset }).then(res => {
    const data = res.data;
    noteList.value.count = data.count;
    noteList.value.list = data.noteList;
  })
}

//分页函数
const currentChange = (page: number) => {
  pageOptions.offset = (page - 1) * 10;
  if (searchText.value) {
    searchNote(pageOptions.limit, pageOptions.offset);
  } else {
    getNoteList(pageOptions.limit, pageOptions.offset);
  }
}

onActivated(() => {
  getNoteList();
})
</script>

<style scoped lang='scss'>
.overview-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    height: 80px;
    background-color: white;

    .search {
      display: flex;
      align-items: center;

      .ipt {
        margin-right: 6px;
        width: 300px;
      }
    }
  }

  .container {
    height: calc(100% - 80px - 42px);

    ::v-deep(.el-table) {
      .span {
        cursor: pointer;

        &.category-text {
          font-weight: bold;
        }

        &:hover {
          color: var(--index-blue);
        }
      }
    }
  }

  .pages {
    margin: 10px auto 0;
  }
}
</style>