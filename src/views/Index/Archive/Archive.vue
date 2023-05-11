<template>
  <MenuView>
    <div class="archive-wrapper">
      <div class="top">
        <div class="search">
          <div class="ipt">
            <el-input v-model="searchText" class="w-50 m-2" size="large" placeholder="搜索归档名" :prefix-icon="Search"
              maxlength="10" show-word-limit clearable @keyup.enter="searchArchive(pageOptions.limit)" />
          </div>
          <div class="btn">
            <el-button @click="searchArchive(pageOptions.limit)">搜索</el-button>
          </div>
        </div>
      </div>

      <div class="container">
        <el-table :data="archiveList.list" border stripe height="100%">
          <el-table-column type="index" width="50" />
          <el-table-column label="归档名" prop="name" width="200" />
          <el-table-column label="来源" prop="source" />
          <el-table-column label="创建时间" prop="createTime" />
          <el-table-column label="是否为修改" prop="update" />
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <div>
                <el-button size="small" type="danger" @click="removeArchive(scope.row.id, scope.row.name)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pages">
        <el-pagination layout="prev, pager, next" :current-page="(pageOptions.offset / pageOptions.limit) + 1"
          :total="archiveList.count" @current-change="currentChange" :page-size="pageOptions.limit" />
      </div>
    </div>
  </MenuView>
</template>

<script setup lang='ts'>
import { deleteArchiveApi, getArchiveListApi, searchArchiveApi } from '@/api';
import { Archive, ArchiveList } from '@/types/ArchiveType';
import { reactive, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';

const searchText = ref('');

//获取归档列表
const archiveList = ref(new ArchiveList());
const pageOptions = reactive({
  limit: 10,
  offset: 0
});
const getArchiveList = (limit: number, offset: number) => {
  getArchiveListApi({ limit: limit, offset: offset }).then(res => {
    const data = res.data;
    archiveList.value.count = data.count;
    archiveList.value.list = data.archiveList.map((item: Archive) => {
      return {
        ...item,
      }
    })
  })
}
getArchiveList(pageOptions.limit, pageOptions.offset);

//删除归档
const removeArchive = (id: number, name: string) => {
  ElMessageBox.confirm(`确认删除归档 ${name} 吗？（注意：此操作不可撤回！）`, '提示', {
    confirmButtonText: '确认删除',
    confirmButtonClass: 'confirm-remove-button',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      deleteArchiveApi(id).then(res => {
        const data = res.data;
        if (data.code === 200) {
          getArchiveList(pageOptions.limit, pageOptions.offset);
        }
      });
    })
    .catch(() => { })
}

//搜索归档
const searchArchive = (limit: number = pageOptions.limit, offset: number = 0) => {
  pageOptions.offset = offset  //搜索时重置页数(偏移量)
  if (searchText.value === '') return getArchiveList(limit, 0);
  searchArchiveApi({ name: searchText.value, limit: limit, offset: offset }).then(res => {
    const data = res.data;
    archiveList.value.count = data.count;
    archiveList.value.list = data.archiveList.map((item: any) => {
      return {
        ...item,
      }
    })
  })
}

//分页函数
const currentChange = (page: number) => {
  pageOptions.offset = (page - 1) * pageOptions.limit;
  if (searchText.value) {
    searchArchive(pageOptions.limit, pageOptions.offset);
  } else {
    getArchiveList(pageOptions.limit, pageOptions.offset);
  }
}
</script>

<style scoped lang='scss'>
.archive-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
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
    height: 0;
    flex: 1;
  }

  .pages {
    margin: 10px auto;
  }
}
</style>