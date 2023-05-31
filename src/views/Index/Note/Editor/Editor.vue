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
              <div class="select-group">
                <el-select class="select" v-model="form.categoryId" placeholder="所属分类">
                  <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id">
                    <div class="category">
                      <img :src="item.coverImg" alt="">
                      <span>{{ item.name }}</span>
                    </div>
                  </el-option>
                </el-select>
                <el-select class="select" multiple collapse-tags collapse-tags-tooltip :max-collapse-tags="4"
                  v-model="form.tagIds" placeholder="添加标签" style="max-width: 544px">
                  <el-option v-for="item in tagList" :key="item.id" :label="item.name" :value="item.id">
                    <div class="tag">
                      <span>{{ item.name }}</span>
                    </div>
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="text">
        <MdEditor class="editor" v-model="form.text" @onUploadImg="onUploadImg"></MdEditor>
      </div>
      <div class="btn">
        <el-button type="primary" @click="submit(ruleFormRef)">提交</el-button>
      </div>
    </div>
  </MenuView>
</template>

<script setup lang='ts'>
import { onActivated, onMounted, ref, watch } from 'vue';
import { onBeforeRouteLeave, useRouter, useRoute } from 'vue-router';
import { getCategoryAllApi, addNoteApi, getNoteInfoApi, updateNoteApi, getTagListApi, uploadApi } from '@/api';
import { useIndexStore } from '@/store';
import { FormInstance, FormRules } from 'element-plus';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const baseURL = import.meta.env.VITE_BASE_URL;

const store = useIndexStore();
const route = useRoute();
const router = useRouter();

const type = ref(route.query.type ? Number(route.query.type) : 1);    // 1：新增  2：修改
const id = ref(Number(route.query.id));

const categoryList = ref([{
  id: 0,
  name: '',
  coverImg: '',
}])
const initCategoryList = () => {
  getCategoryAllApi().then(res => {
    const data = res.data;
    categoryList.value = data.map((item: any) => {
      return {
        ...item,
        coverImg: item.coverImg ? baseURL + item.coverImg : new URL('@/assets/image/defaultCategory.png', import.meta.url),
      }
    });
  })
}

const tagList = ref([{ id: 0, name: '' }])
const initTagList = () => {
  getTagListApi().then(res => {
    const data = res.data;
    tagList.value = data.map((item: any) => {
      return {
        ...item,
      }
    });
  });
}

const form = ref({
  title: '',
  subtitle: '',
  categoryId: '',
  tagIds: [],
  text: ''
});
const getInfo = async () => {
  if (!id.value || type.value === 1) return
  const { data } = await getNoteInfoApi(id.value)
  form.value.title = data.title;
  form.value.subtitle = data.subtitle;
  form.value.categoryId = data.category.id;
  form.value.tagIds = data.tags.map((tag: any) => {
    return tag.id
  });
  form.value.text = data.noteInfo.noteText;
  isInit.value = true;
}

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

const submit = async (formRules: FormInstance | undefined) => {
  if (!formRules) return;
  if (form.value.text === '') return ElMessage.error('文本内容不能为空！');
  await formRules.validate(async (valid, fields) => {
    if (valid) {
      if (type.value === 1) {
        await addNoteApi(form.value)
      }
      else if (type.value === 2) {
        await updateNoteApi(id.value, form.value)
      }
      changeCount.value = 0;
      store.setEditorChange(false);
      // router.push('/note/overview');
    }
  })
}

//修改未保存提示
const isInit = ref(false);   //是否为数据初始化
const changeCount = ref(0);   //修改次数，当为1时表示为初始化时的变化
watch(form, () => {
  if (changeCount.value <= 10) changeCount.value++;   //增加修改次数
  if (isInit.value) {
    changeCount.value = 1;
    isInit.value = false
  };
  store.setEditorChange(changeCount.value > 1);

}, { deep: true })

//图片上传事件
const onUploadImg = async (files: any, callback: any) => {
  const res = await Promise.all(
    files.map((file: any) => {
      return new Promise((rev, rej) => {
        const formData = new FormData();
        formData.append('img', file);

        uploadApi(formData)
          .then((res: any) => rev(res))
          .catch((error: any) => rej(error));
      });
    })
  );

  callback(res.map((item) => baseURL + item.data.url));
}

onActivated(() => {
  initCategoryList();
  initTagList();
  type.value = route.query.type ? Number(route.query.type) : 1;    // 1：新增  2：修改
  id.value = Number(route.query.id);

  store.setMenuViewTitle(type.value === 1 ? '新增' : '修改');

  if (store.editorType === 2) {
    getInfo();
  }
  else {
    form.value = {
      title: '',
      subtitle: '',
      categoryId: '',
      tagIds: [],
      text: ''
    };
  }
});
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

      .select-group {
        display: flex;
        width: 100%;

        .select {
          flex: 1;
        }
      }
    }
  }

  .text {
    flex: 1;
    overflow: hidden;

    .editor {
      height: 100%;
    }
  }

  .btn {
    margin-top: 10px;
    display: flex;
    flex-direction: row-reverse;
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