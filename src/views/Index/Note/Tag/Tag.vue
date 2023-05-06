<template>
  <MenuView>
    <div class="tag-wrapper">
      <div class="top">
        <div class="search">
          <div class="ipt">
            <el-input v-model="searchText" class="w-50 m-2" size="large" placeholder="搜索分类名" :prefix-icon="Search"
              maxlength="10" show-word-limit clearable @keyup.enter="searchTag(pageOptions.limit)" />
          </div>
          <div class="btn">
            <el-button @click="searchTag(pageOptions.limit)">搜索</el-button>
          </div>
        </div>
        <div class="btn">
          <el-button type="success" :icon="Plus" @click="dialogAdd">新增</el-button>
        </div>
      </div>
      <div class="container">
        <el-table :data="tagList.list" border stripe height="100%">
          <el-table-column type="index" width="50" />
          <el-table-column label="标签名" prop="name" />
          <el-table-column label="创建时间" prop="createTime" />
          <el-table-column label="更新时间" prop="updateTime" />
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <div>
                <el-button size="small" type="primary" @click="updateTag(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="removeTag(scope.row.id, scope.row.name)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pages">
        <el-pagination layout="prev, pager, next" :current-page="(pageOptions.offset / 10) + 1" :total="tagList.count"
          @current-change="currentChange" />
      </div>
    </div>

    <el-dialog @closed="dialogClose" v-model="dialogView" :title="dialogTitle" width="30%" align-center>
      <el-form ref="ruleFormRef" label-position="right" label-width="100px" :model="form" :rules="rules"
        style="max-width: 460px">
        <el-form-item label="标签名" prop="name">
          <el-input v-model="form.name" maxlength="15" show-word-limit />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogView = false">取消</el-button>
          <el-button type="primary" @click="confirm(ruleFormRef)">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </MenuView>
</template>

<script setup lang='ts'>
import { onActivated, reactive, ref } from 'vue';
import { getTagListApi, searchTagApi, deleteTagApi, addTagApi, updateTagApi } from '@/api/index';
import { Search, Plus } from '@element-plus/icons-vue'
import { FormInstance, FormRules } from 'element-plus';
import { TagList } from '@/types/TagType';
import { useIndexStore } from '@/store';

const store = useIndexStore();

//刷新列表
const RefreshList = (data: any) => {
  if (data.code === 200) {
    dialogView.value = false;
    getTagList(pageOptions.limit, pageOptions.offset);
  }
}

const searchText = ref('');

//获取标签列表
const tagList = ref(new TagList());
const pageOptions = reactive(store.pageOptions);
const getTagList = (limit: number = pageOptions.limit, offset: number = 0) => {
  getTagListApi({ limit: limit, offset: offset }).then(res => {
    const data = res.data;
    tagList.value.count = data.count;
    tagList.value.list = data.tagList;
  })
}
getTagList();

//表单窗口相关
const dialogType = ref(1);   // 1：新增  2：更新
const dialogView = ref(false);
const dialogTitle = ref('新增');
const dialogAdd = () => {
  dialogTitle.value = '新增';
  dialogType.value = 1;
  dialogView.value = true;
}

//修改标签
const updateTag = (data: any) => {
  dialogTitle.value = '修改';
  dialogType.value = 2;
  const { id, name } = data;
  form.value = { id, name };
  dialogView.value = true;
}
const form = ref({
  id: 0,
  name: '',
});
const clearForm = () => {
  form.value = {
    id: 0,
    name: '',
  };
}
//表单校验
const ruleFormRef = ref<FormInstance>()
const rules = ref<FormRules>({
  name: [
    { required: true, message: '标签名不能为空！', trigger: 'blur' },
    { max: 15, message: '长度不能超过15个字！', trigger: 'blur' }
  ],
})
const confirm = async (formRules: FormInstance | undefined) => {
  if (!formRules) return;
  await formRules.validate((valid, fields) => {
    if (valid) {
      if (dialogType.value === 1) {
        addTagApi(form.value).then(res => {
          const data = res.data;
          RefreshList(data);
        });
      } else if (dialogType.value === 2) {
        updateTagApi(form.value).then(res => {
          const data = res.data;
          RefreshList(data);
        });
      }
    }
  })
}
const dialogClose = () => {
  clearForm();
}

//删除标签
const removeTag = (id: number, name: string) => {
  ElMessageBox.confirm(`确认删除分类 ${name} 吗？`, '提示', {
    confirmButtonText: '确认删除',
    confirmButtonClass: 'confirm-remove-button',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      deleteTagApi(id).then(res => {
        const data = res.data;
        RefreshList(data);
      });
    })
    .catch(() => { })
}

//搜索标签
const searchTag = (limit: number = pageOptions.limit, offset: number = 0) => {
  pageOptions.offset = offset  //搜索时重置页数(偏移量)
  if (searchText.value === '') return getTagList(limit, 0);
  searchTagApi({ name: searchText.value, limit: limit, offset: offset }).then(res => {
    const data = res.data;
    tagList.value.count = data.count;
    tagList.value.list = data.tagList;
  })
}

//分页函数
const currentChange = (page: number) => {
  pageOptions.offset = (page - 1) * 10;
  if (searchText.value) {
    searchTag(pageOptions.limit, pageOptions.offset);
  } else {
    getTagList(pageOptions.limit, pageOptions.offset);
  }
}

onActivated(() => {
  getTagList();
})
</script>

<style scoped lang='scss'>
.tag-wrapper {
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

  .pages {
    margin: 10px auto 0;
  }
}
</style>