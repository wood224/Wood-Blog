<template>
  <MenuView>
    <div class="editor-wrapper">
      <div class="title-form">
        <div class="right">
          <el-form ref="ruleFormRef" :model="form" :rules="rules">
            <el-form-item prop="title">
              <el-input v-model="form.title" placeholder="标题" maxlength="50" show-word-limit></el-input>
            </el-form-item>
            <el-form-item prop="subtitle">
              <el-input v-model="form.subtitle" placeholder="副标题" maxlength="50" show-word-limit></el-input>
            </el-form-item>
            <el-form-item prop="categoryId">
              <el-select class="category-select" v-model="form.categoryId" placeholder="所属分类">
                <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id">
                  <div class="category">
                    <img :src="item.coverImg" alt="">
                    <span>{{ item.name }}</span>
                  </div>
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="text">
        <MdEditor class="editor" v-model="form.text" @onSave="onSave(ruleFormRef)"></MdEditor>
      </div>
    </div>
  </MenuView>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getCategoryAllApi, addNoteApi } from '@/api';
import { useIndexStore } from '@/store';
import { FormInstance, FormRules } from 'element-plus';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const baseURL = __BaseURL__;

const store = useIndexStore();
const route = useRoute();
const type = ref(route.query.type ? Number(route.query.type) : 1);    // 1：新增  2：修改
const id = ref(route.query.id);

const categoryList = ref([{
  id: 0,
  name: '',
  coverImg: '',
}])
getCategoryAllApi().then(res => {
  const data = res.data;
  categoryList.value = data.map((item: any) => {
    return {
      ...item,
      coverImg: item.coverImg ? baseURL + item.coverImg : new URL('@/assets/image/defaultCategory.png', import.meta.url),
    }
  });
})

const form = ref({
  title: '',
  subtitle: '',
  categoryId: '',
  text: ''
});

//表单校验
const ruleFormRef = ref<FormInstance>();
const rules = ref<FormRules>({
  title: [
    { required: true, message: '标题不能为空！', trigger: 'blur' },
    { max: 50, message: '长度不能超过50个字！', trigger: 'blur' }
  ],
  subtitle: [
    { max: 50, message: '长度不能超过50个字！', trigger: 'blur' }
  ],
  categoryId: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ]
});

const onSave = async (formRules: FormInstance | undefined) => {
  if (!formRules) return;
  await formRules.validate((valid, fields) => {
    if (valid) {
      if (type.value === 1) {
        addNoteApi(form.value).then(res => {
          console.log(res.data);
        })
      }
    }
  })
}

onMounted(() => {
  console.log(type.value);

  store.setMenuViewTitle(type.value === 1 ? '新增' : '修改');
})
</script>

<style scoped lang='scss'>
.editor-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  background-color: white;

  .title-form {
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    .left {
      margin-right: 20px;
    }

    .right {
      flex: 1;

      .category-select {
        width: 100%;
      }
    }
  }

  .text {
    flex: 1;

    .editor {
      height: 100%;
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

.el-select-dropdown__item {
  padding: 10px;
  box-sizing: content-box;

  .category {
    display: flex;
    align-items: center;
    height: 30px;

    img {
      margin-right: 8px;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>