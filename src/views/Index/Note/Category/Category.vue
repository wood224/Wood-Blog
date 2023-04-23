<template>
  <MenuView :title="title">
    <template #default>
      <div class="category-wrapper">
        <div class="top">
          <div class="search">
            <div class="ipt">
              <el-input v-model="searchText" class="w-50 m-2" size="large" placeholder="搜索" :prefix-icon="Search"
                maxlength="10" show-word-limit clearable @keyup.enter="searchCategory" />
            </div>
            <div class="btn">
              <el-button @click="searchCategory">搜索</el-button>
            </div>
          </div>
          <div class="btn">
            <el-button type="success" :icon="Plus" @click="dialogAdd">新增</el-button>
          </div>
        </div>
        <div class="container">
          <el-table :data="categoryList" border stripe>
            <el-table-column type="index" width="50" />
            <el-table-column label="图片">
              <template #default="scope">
                <div class="table-cover-img">
                  <img :src="scope.row.coverImg" alt="暂无图片">
                </div>
              </template>
            </el-table-column>
            <el-table-column label="分类名" prop="name" width="200" />
            <el-table-column label="分类简介" prop="introduction" width="400" />
            <el-table-column label="创建时间" prop="createTime" />
            <el-table-column label="更新时间" prop="updateTime" />
            <el-table-column label="操作" width="150">
              <template #default="scope">
                <div>
                  <el-button size="small" type="primary" @click="updateCategory(scope.row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="removeCategory(scope.row.id)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pages"></div>
      </div>

      <el-dialog @closed="dialogClose" v-model="dialogView" :title="dialogTitle" width="30%" align-center>
        <el-form ref="ruleFormRef" label-position="right" label-width="100px" :model="form" :rules="rules"
          style="max-width: 460px">
          <el-form-item label="分类封面">
            <el-upload ref="uploadRef" class="cover-img" :action="baseURL + '/category'" :show-file-list="false"
              :on-change="handleCoverChange" :auto-upload="false">
              <img v-if="form.coverImg" :src="form.coverImg" class="img" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="分类名" prop="name">
            <el-input v-model="form.name" maxlength="10" show-word-limit />
          </el-form-item>
          <el-form-item label="分类简介" prop="introduction">
            <el-input v-model="form.introduction" maxlength="50" type="textarea" show-word-limit />
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
    </template>
  </MenuView>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import MenuView from '@/components/MenuView.vue';
import { getCategoryApi, addCategoryApi, updateCategoryApi, deleteCategoryApi, searchCategoryApi } from '@/api/index';
import { Search, Plus } from '@element-plus/icons-vue'
import { Category } from '@/types/CategoryType';
import { FormInstance, FormRules, UploadInstance, UploadProps } from 'element-plus';

const baseURL = __BaseURL__;

//响应消息显示
const responseMessage = (data: any) => {
  if (data.code === 200) {
    dialogView.value = false;
    getCategoryList();
  }
}

const route = useRoute();
const title = ref<string>(route.meta.title as string);

const searchText = ref('');

//获取分类列表
const categoryList = ref<Array<Category>>();
const getCategoryList = () => {
  getCategoryApi().then(res => {
    const data = res.data;
    categoryList.value = data.map((item: any) => {
      return {
        ...item,
        coverImg: item.coverImg ? baseURL + item.coverImg : '',
      }
    })
  })
}
getCategoryList();

const dialogView = ref(false);
const dialogTitle = ref('新增');
const dialogAdd = () => {
  dialogTitle.value = '新增';
  dialogType.value = 1;
  dialogView.value = true;
}

//表单窗口相关
const dialogType = ref(1);   // 1：新增  2：更新
const updateCategory = (data: any) => {
  dialogTitle.value = '修改';
  dialogType.value = 2;
  const { id, coverImg, name, introduction } = data;
  form.value = { id, coverImg, name, introduction };
  dialogView.value = true;
}
const imgFile = ref<File | null>(null);
const form = ref({
  id: 0,
  coverImg: '',
  name: '',
  introduction: ''
});
const clearForm = () => {
  form.value = {
    id: 0,
    coverImg: '',
    name: '',
    introduction: ''
  };
}
//表单校验
const ruleFormRef = ref<FormInstance>()
const uploadRef = ref<UploadInstance>()
const rules = ref<FormRules>({
  name: [
    { required: true, message: '分类名不能为空！', trigger: 'blur' },
    { max: 10, message: '长度不能超过10个字！', trigger: 'blur' }
  ],
  introduction: [
    { max: 50, message: '长度不能超过50个字！', trigger: 'blur' }
  ]
})
const confirm = async (formRules: FormInstance | undefined) => {
  if (!formRules) return;
  await formRules.validate((valid, fields) => {
    if (valid) {
      const formData = new FormData();
      if (imgFile.value) {
        formData.append('coverImg', imgFile.value);
      }
      formData.append('id', form.value.id + '');
      formData.append('name', form.value.name);
      formData.append('introduction', form.value.introduction);
      if (dialogType.value === 1) {
        addCategoryApi(formData).then(res => {
          const data = res.data;
          responseMessage(data);
        });
      } else if (dialogType.value === 2) {
        updateCategoryApi(formData).then(res => {
          const data = res.data;
          responseMessage(data);
        });
      }
    }
  })
}
const dialogClose = () => {
  imgFile.value = null;
  clearForm();
}

//删除分类
const removeCategory = (id: number) => {
  deleteCategoryApi(id).then(res => {
    const data = res.data;
    responseMessage(data);
  });
}

//搜索分类
const searchCategory = () => {
  if (searchText.value === '') return getCategoryList();
  searchCategoryApi(searchText.value).then(res => {
    const data = res.data;
    categoryList.value = data.map((item: any) => {
      return {
        ...item,
        coverImg: item.coverImg ? baseURL + item.coverImg : '',
      }
    })
  })
}

//图片上传相关
const handleCoverChange: UploadProps['onChange'] = (uploadFile) => {
  if (uploadFile.raw!.type !== 'image/jpeg' && uploadFile.raw!.type !== 'image/png') {
    ElMessage.error('请选择图片！');
    return false;
  } else if (uploadFile.raw!.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2M！');
    return false
  }
  imgFile.value = uploadFile.raw!;
  form.value.coverImg = URL.createObjectURL(uploadFile.raw!);
}
</script>

<style scoped lang='scss'>
.category-wrapper {
  display: flex;
  flex-direction: column;

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
    .table-cover-img {
      width: 50px;
      height: 50px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}

.cover-img {
  display: block;
  width: 200px;
  height: 200px;

  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>