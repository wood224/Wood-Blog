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
        <MdEditor class="editor" v-model="form.text"></MdEditor>
      </div>
      <div class="btn">
        <el-button type="primary" @click="submit(ruleFormRef)">提交</el-button>
      </div>
    </div>
  </MenuView>
</template>

<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { getCategoryAllApi, addNoteApi, getNoteInfoApi, updateNoteApi } from '@/api';
import { useIndexStore } from '@/store';
import { FormInstance, FormRules } from 'element-plus';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import router from '@/router';

const baseURL = __BaseURL__;

const store = useIndexStore();
const route = useRoute();
const type = ref(route.query.type ? Number(route.query.type) : 1);    // 1：新增  2：修改
const id = ref(Number(route.query.id));

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
const getInfo = () => {
  if (!id.value || type.value === 1) return
  getNoteInfoApi(id.value).then(res => {
    const data = res.data;
    form.value.title = data.title;
    form.value.subtitle = data.subtitle;
    form.value.categoryId = data.category.id;
    form.value.text = data.noteInfo.noteText;
  })
}
getInfo();

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
  await formRules.validate((valid, fields) => {
    if (valid) {
      if (type.value === 1) {
        addNoteApi(form.value).then(res => {
        })
      }
      else if (type.value === 2) {
        updateNoteApi(id.value, form.value).then(res => {

        })
      }
      changeCount.value = 0;
      isChange.value = false;
      router.push('/note/overview');
    }
  })
}

//修改未保存提示
const changeCount = ref(0);   //修改次数，当为1时表示为初始化时的变化
const isChange = ref(false);
watch(form, () => {
  if (changeCount.value <= 10) changeCount.value++;   //增加修改次数
  isChange.value = changeCount.value > 1;
}, { deep: true })
onBeforeRouteLeave((to, from) => {
  if (isChange.value) {
    return ElMessageBox.confirm('有修改未提交，确定离开吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(() => {
      return true;
    }).catch(() => {
      return false;
    });
  }
  else {
    return true
  }
})

onMounted(() => {
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