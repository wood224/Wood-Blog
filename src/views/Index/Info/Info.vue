<template>
  <div class="info-wrapper">
    <div class="left">
      <el-form class="form" ref="ruleFormRef" label-position="right" label-width="100px" :model="form" :rules="rules"
        style="max-width: 460px">
        <el-form-item label="头像">
          <el-upload ref="uploadRef" class="avatar" :action="baseURL + '/admin/info'" :show-file-list="false"
            :on-change="handleAvatarChange" :auto-upload="false">
            <img v-if="form.avatar" :src="form.avatar" class="img" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="form.name" maxlength="10" show-word-limit />
        </el-form-item>
        <el-form-item label="个性签名" prop="signature">
          <el-input v-model="form.signature" maxlength="50" type="textarea" show-word-limit />
        </el-form-item>
        <el-form-item label="技术栈" prop="technology">
          <div class="technology">
            <template v-for="(item, index) in form.technology" v-if="form.technology" :key="index">
              <div class="tag">
                <el-input class="tag-edit" v-show="item.editVisible" ref="tagEditRefs" v-model="editInputText"
                  @keyup.enter.native="editEnterPress($event)" @blur="editTechnology(item)"></el-input>
                <el-tag v-show="!item.editVisible" hit closable @close="handleTagClose(index)"
                  @click="handleTagClick(item, index)" disable-transitions maxlength="15" show-word-limit>
                  <span>{{ item.name }}</span>
                </el-tag>
              </div>
            </template>
            <el-input class="tag-input" ref="tagInputRef" v-model="inputText" v-if="inputVisible" maxlength="15"
              show-word-limit @keyup.enter.native="addEnterPress($event)" @blur="addTechnology"></el-input>
            <el-button class="tag-add" type="primary" @click="showInput" v-else>
              <el-icon>
                <Plus />
              </el-icon>
            </el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-top: 50px;" :disabled="!isChange" type="primary"
            @click="confirm(ruleFormRef)">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { nextTick, ref, watch } from 'vue';
import { FormInstance, FormRules, UploadInstance, UploadProps } from 'element-plus';
import { getInfoApi, updateInfoApi } from '@/api/index';
import { onBeforeRouteLeave } from 'vue-router';
import { TechnologyTag } from '@/types/TechnologyTagType';
import { Info } from '@/types/InfoType';

const baseURL = __BaseURL__;

const tagInputRef = ref<HTMLInputElement>();
const inputVisible = ref(false);
const inputText = ref('');
//回车时触发input的失焦事件，避免函数二次调用
const addEnterPress = (e: Event) => {
  (e.target as HTMLElement).blur();
}
const addTechnology = () => {
  if (inputText.value === '') return inputVisible.value = false;
  if (form.value.technology.length >= 10) {
    inputVisible.value = false;
    ElMessage.warning('标签最大数量为10个！');
    return
  }
  form.value.technology.push({
    editVisible: false,
    name: inputText.value,
  });
  inputText.value = '';
  inputVisible.value = false;
}
const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    tagInputRef.value?.focus();
  });
}

const imgFile = ref<File | null>(null);
const form = ref<Info>(new Info());
//获取个人信息
const getInfo = () => {
  getInfoApi().then(res => {
    const data = res.data;
    if (res.status === 200) {
      form.value = {
        ...data,
        avatar: data.avatar ? baseURL + data.avatar : '',
        technology: data.technology !== '' ? data.technology.split(',').map((item: string) => {
          return {
            editVisible: false,
            name: item,
          }
        }) : []
      }
    };
  })
}
getInfo();

const handleTagClose = (index: number) => {
  form.value.technology.splice(index, 1);
}

//编辑 tag
const tagEditRefs = ref(null);
const editInputText = ref('');
const handleTagClick = (item: TechnologyTag, index: number) => {
  item.editVisible = true;
  editInputText.value = item.name;
  nextTick(() => {
    (tagEditRefs.value![index] as HTMLElement).focus();
  });
}
//回车时触发input的失焦事件，避免函数二次调用
const editEnterPress = (e: Event) => {
  (e.target as HTMLElement).blur();
}
const editTechnology = (item: TechnologyTag) => {
  item.name = editInputText.value
  if (editInputText.value === '') return item.editVisible = false;
  item.editVisible = false;
  editInputText.value = ''
}

//表单校验
const ruleFormRef = ref<FormInstance>()
const uploadRef = ref<UploadInstance>()
const rules = ref<FormRules>({
  name: [
    { required: true, message: '名字不能为空！', trigger: 'blur' },
    { max: 10, message: '长度不能超过10个字！', trigger: 'blur' }
  ],
})
const confirm = async (formRules: FormInstance | undefined) => {
  if (!formRules) return;
  await formRules.validate((valid, fields) => {
    if (valid) {
      const formData = new FormData();
      if (imgFile.value) {
        formData.append('avatar', imgFile.value);
      }
      formData.append('id', form.value.id + '');
      formData.append('name', form.value.name);
      formData.append('signature', form.value.signature);
      //reduce 方法拼接数组为字符串(需要去掉最后一位分隔符)
      formData.append('technology', form.value.technology.reduce((acc, val) => acc.concat(val.name, ','), '').slice(0, -1));
      updateInfoApi(formData).then(res => {
        changeCount.value = 0;
        isChange.value = false;
      })
    }
  })
}

//图片上传相关
const handleAvatarChange: UploadProps['onChange'] = (uploadFile) => {
  if (uploadFile.raw!.type !== 'image/jpeg' && uploadFile.raw!.type !== 'image/png') {
    ElMessage.error('请选择图片！');
    return;
  } else if (uploadFile.raw!.size / 1024 / 1024 > 4) {
    ElMessage.error('图片大小不能超过4M！');
    return
  }
  imgFile.value = uploadFile.raw!;
  form.value.avatar = URL.createObjectURL(uploadFile.raw!);
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
</script>

<style scoped lang='scss'>
.info-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;

    .form {
      display: flex;
      flex-direction: column;
      align-items: left;
      width: 100%;

      .avatar {
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

      .technology {
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        .tag {
          margin: 2px 6px;

          .tag-edit {
            width: 150px;
            height: 24px;
          }
        }

        .tag-input {
          margin: 0 10px;
          width: 150px;
          height: 24px;
        }

        .tag-add {
          padding: 2px 8px;
          height: 24px;
          line-height: 24px;
        }
      }
    }
  }
}
</style>