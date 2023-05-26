<template>
  <MenuView>
    <div class="about-wrapper">
      <div class="top">
        <div class="search">
          <div class="ipt">
            <el-input v-model="searchText" class="w-50 m-2" size="large" placeholder="搜索版块名" :prefix-icon="Search"
              maxlength="10" show-word-limit clearable @keyup.enter="searchAbout(pageOptions.limit)" />
          </div>
          <div class="btn">
            <el-button @click="searchAbout(pageOptions.limit)">搜索</el-button>
          </div>
        </div>
        <div class="btn">
          <el-button type="success" :icon="Plus" @click="dialogAdd(1)">新增版块及内容</el-button>
        </div>
      </div>
      <div class="container">
        <el-table :data="aboutList" border height="100%">
          <el-table-column type="expand">
            <template #default="props">
              <div class="info-list">
                <div class="info-top">
                  <h3>包含内容：</h3>
                  <div class="btn">
                    <el-button size="small" round :icon="Plus" @click="dialogAdd(2, props.row)">新增内容</el-button>
                  </div>
                </div>
                <el-table :data="props.row.aboutInfos" :max-height="150">
                  <el-table-column type="index" width="50" />
                  <el-table-column label="标题" prop="title" />
                  <el-table-column label="内容" prop="content" />
                  <el-table-column label="创建时间" prop="createTime" />
                  <el-table-column label="更新时间" prop="updateTime" />
                  <el-table-column label="操作" width="150">
                    <template #default="scope">
                      <div>
                        <el-button size="small" round type="primary"
                          @click="updateAbout({ id: props.row.id, name: props.row.name, infoId: scope.row.id, title: scope.row.title, content: scope.row.content }, 2)">编辑</el-button>
                        <el-button size="small" round type="danger"
                          @click="removeAbout(scope.row.id, scope.row.title, 2)">删除</el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="版块" prop="name" />
          <el-table-column label="创建时间" prop="createTime" />
          <el-table-column label="更新时间" prop="updateTime" />
          <el-table-column label="操作" width="200">
            <template #default="scope">
              <div>
                <el-button type="primary" @click="updateAbout(scope.row, 1)">编辑</el-button>
                <el-button type="danger" @click="removeAbout(scope.row.id, scope.row.name, 1)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog @closed="dialogClose" v-model="dialogView" :title="dialogTitle" width="30%" align-center destroy-on-close>
      <el-form ref="ruleFormRef" label-position="right" label-width="100px" :model="form" :rules="rules"
        style="max-width: 460px">
        <el-form-item label="版块名" prop="name">
          <el-input v-model="form.name" maxlength="15" show-word-limit :disabled="actionType === 2" />
        </el-form-item>
        <el-form-item v-if="actionType === 2" label="内容标题名" prop="title">
          <el-input v-model="form.title" maxlength="15" show-word-limit />
        </el-form-item>
        <el-form-item v-if="actionType === 2" label="内容详情" prop="content">
          <el-input v-model="form.content" maxlength="15" show-word-limit />
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
import { reactive, ref } from 'vue';
import { getAboutListApi, addAboutApi, updateAboutApi, deleteAboutApi, addAboutInfoApi, updateAboutInfoApi, deleteAboutInfoApi, searchAboutApi } from '@/api/index';
import { Search, Plus } from '@element-plus/icons-vue';
import { About } from '@/types/AboutType';
import { FormInstance, FormRules } from 'element-plus';

//刷新列表
const RefreshList = (data: any) => {
  if (data.code === 200) {
    dialogView.value = false;
    getAboutList();
  }
}

const searchText = ref('');

//获取关于列表
const aboutList = ref<About[]>();
const pageOptions = reactive({
  limit: 2,
  offset: 0
});
const getAboutList = () => {
  getAboutListApi().then(res => {
    const data = res.data;
    aboutList.value = data;
  })
}
getAboutList();

//表单窗口相关
const actionType = ref(1);    // 1：来自版块  2：来自内容
const dialogType = ref(1);    // 1：新增  2：更新
const dialogView = ref(false);
const dialogTitle = ref('新增');
const dialogAdd = (type: number, item?: any) => {
  actionType.value = type;
  if (type === 2) {
    form.value.id = item.id
    form.value.name = item.name;
  }
  dialogTitle.value = '新增';
  dialogType.value = 1;
  dialogView.value = true;
}

//修改关于
const updateAbout = (data: any, type: number) => {
  actionType.value = type;
  form.value.id = data.id
  form.value.name = data.name;
  if (type == 2) {
    form.value.infoId = data.infoId;
    form.value.title = data.title;
    form.value.content = data.content;
  }
  dialogTitle.value = '修改';
  dialogType.value = 2;
  dialogView.value = true;

}
const form = ref({
  id: 0,
  name: '',
  infoId: 0,
  title: '',
  content: ''
});
const clearForm = () => {
  form.value = {
    id: 0,
    name: '',
    infoId: 0,
    title: '',
    content: ''
  };
}
//表单校验
const ruleFormRef = ref<FormInstance>()
const rules = ref<FormRules>({
  name: [
    { required: true, message: '版块名不能为空！', trigger: 'blur' },
    { max: 5, message: '长度不能超过5个字！', trigger: 'blur' }
  ],
  title: [
    { required: true, message: '内容标题名不能为空！', trigger: 'blur' },
    { max: 10, message: '长度不能超过10个字！', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '内容详情不能为空！', trigger: 'blur' },
    { max: 50, message: '长度不能超过50个字！', trigger: 'blur' }
  ]
})
const confirm = async (formRules: FormInstance | undefined) => {
  if (!formRules) return;
  await formRules.validate((valid, fields) => {
    if (valid) {
      const temp = form.value;
      if (dialogType.value === 1) {
        if (actionType.value === 1) {
          addAboutApi({ name: temp.name }).then(res => {
            const data = res.data;
            RefreshList(data);
          })
        } else {
          addAboutInfoApi({ id: temp.infoId, title: temp.title, content: temp.content, AId: temp.id }).then(res => {
            const data = res.data;
            RefreshList(data);
          })
        }
      } else {
        if (actionType.value === 1) {
          updateAboutApi({ id: temp.id, name: temp.name, }).then(res => {
            const data = res.data;
            RefreshList(data);
          })
        } else {
          updateAboutInfoApi({ id: temp.infoId, title: temp.title, content: temp.content, AId: temp.id }).then(res => {
            const data = res.data;
            RefreshList(data);
          })
        }
      }
    }
  })
}
const dialogClose = () => {
  clearForm();
}

//删除关于
const removeAbout = (id: number, name: string, type: number) => {
  actionType.value = type;
  ElMessageBox.confirm(`确认删除${type === 1 ? '版块' : '内容'} ${name} 吗？`, '提示', {
    confirmButtonText: '确认删除',
    confirmButtonClass: 'confirm-remove-button',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      if (type === 1) {
        deleteAboutApi(id).then(res => {
          const data = res.data;
          RefreshList(data);
        });
      } else {
        deleteAboutInfoApi(id).then(res => {
          const data = res.data;
          RefreshList(data);
        });
      }
    })
    .catch(() => { })
}

// 搜索分类
const searchAbout = (limit: number = pageOptions.limit, offset: number = 0) => {
  pageOptions.offset = offset  //搜索时重置页数(偏移量)
  if (searchText.value === '') return getAboutList();
  searchAboutApi({ name: searchText.value, limit: limit, offset: offset }).then(res => {
    const data = res.data;
    aboutList.value = data;
  })
}
</script>

<style scoped lang='scss'>
.about-wrapper {
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

    .info-list {
      padding: 20px 50px;
      background-color: #cecece;

      .info-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

    }
  }
}
</style>