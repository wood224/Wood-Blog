<template>
  <MenuView>
    <div class="friend-wrapper">
      <div class="container">
        <el-scrollbar>
          <ul>
            <li class="friend" v-for="item in friendList.list" :key="item.id" @click="openLink(item.link)">
              <el-card shadow="hover">
                <div class="left">
                  <img :src="item.img" alt="">
                </div>
                <div class="right">
                  <div class="name">
                    <el-text truncated :title="item.name">
                      {{ item.name }}
                    </el-text>
                  </div>
                  <div class="introduction">
                    <el-text truncated :title="item.introduction">
                      {{ item.introduction }}
                    </el-text>
                  </div>
                  <div class="time">
                    <el-text truncated size="small" :title="item.createTime">
                      {{ item.createTime }}
                    </el-text>
                  </div>
                </div>
              </el-card>
              <div class="action">
                <el-dropdown>
                  <span class="dropdown-link">
                    操作
                    <el-icon class="el-icon--right">
                      <arrow-down />
                    </el-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>
                        <div class="update" @click.stop="updateFriend(item)">
                          <i class="fa fa-edit"></i>
                          <span>修改</span>
                        </div>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <div class="remove" @click.stop="deleteFriend(item.id, item.name)">
                          <i class="fa fa-trash"></i>
                          <span>删除</span>
                        </div>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </li>
            <li>
              <div class="add" @click="dialogAdd">
                <el-icon :size="30" color="var(--add-color)">
                  <Plus />
                </el-icon>
              </div>
            </li>
            <li v-for="item in 10" :key="item">
            </li>
          </ul>
        </el-scrollbar>
      </div>
      <div class="pages">
        <el-pagination layout="prev, pager, next" :current-page="(pageOptions.offset / pageOptions.limit) + 1"
          :total="friendList.count" @current-change="currentChange" :page-size="pageOptions.limit" />
      </div>
    </div>

    <el-dialog @closed="dialogClose" v-model="dialogView" :title="dialogTitle" width="30%" align-center>
      <el-form ref="ruleFormRef" label-position="right" label-width="100px" :model="form" :rules="rules"
        style="max-width: 460px">
        <el-form-item label="图片">
          <el-upload ref="uploadRef" class="cover-img" :action="baseURL + '/category'" :show-file-list="false"
            :on-change="handleCoverChange" :auto-upload="false">
            <img v-if="form.img" :src="form.img" class="img" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="名字" prop="name">
          <el-input v-model="form.name" maxlength="15" show-word-limit />
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
          <el-input v-model="form.introduction" maxlength="50" type="textarea" show-word-limit />
        </el-form-item>
        <el-form-item label="链接" prop="link">
          <el-input v-model="form.link" />
        </el-form-item>
        <el-form-item>
          <el-link @click="getFavicon(form.link)">获取图标</el-link>
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
import { addFriendApi, getFriendListApi, deleteFriendApi, updateFriendApi } from '@/api';
import { Friend, FriendList } from '@/types/FriendType';
import { FormInstance, FormRules, UploadInstance, UploadProps } from 'element-plus';

const baseURL = import.meta.env.VITE_BASE_URL;

//刷新列表
const RefreshList = (data: any) => {
  if (data.code === 200) {
    dialogView.value = false;
    getFriendList(pageOptions.limit, pageOptions.offset);
  }
}

//获取友链列表
const friendList = ref(new FriendList());
const pageOptions = reactive({
  limit: 12,
  offset: 0
});
const getFriendList = (limit: number, offset: number) => {
  getFriendListApi({ limit: limit, offset: offset }).then(res => {
    const data = res.data;
    friendList.value.count = data.count;
    friendList.value.list = data.friendLinkList.map((item: Friend) => {
      const res = item.img.match(validURLStr);
      const img = res ? item.img : item.img === '' ? new URL('@/assets/image/defaultLink.png', import.meta.url) : baseURL + item.img;
      return {
        ...item,
        img: img
      }
    })
  })
}
getFriendList(pageOptions.limit, pageOptions.offset);

//跳转链接
const openLink = (link: string) => {
  window.open(link);
}

//表单窗口相关
const dialogType = ref(1);   // 1：新增  2：更新
const dialogView = ref(false);
const dialogTitle = ref('新增');
const dialogAdd = () => {
  dialogTitle.value = '新增';
  dialogType.value = 1;
  dialogView.value = true;
}
const imgFile = ref<File | null>(null);
const form = ref({
  id: 0,
  img: '',
  name: '',
  introduction: '',
  link: ''
});
const clearForm = () => {
  form.value = {
    id: 0,
    img: '',
    name: '',
    introduction: '',
    link: ''
  };
}

//获取网页图标
const getFavicon = async (link: string) => {
  if (link === '') return
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate((valid) => {
    if (valid) {
      return form.value.img = link + (link.charAt(link.length - 1) === '/' ? '' : '/') + 'favicon.ico';
    } else {
      return
    }
  })
}

//修改分类
const updateFriend = (data: any) => {
  dialogTitle.value = '修改';
  dialogType.value = 2;
  const { id, img, name, introduction, link } = data;
  form.value = { id, img, name, introduction, link };
  dialogView.value = true;
}

//表单校验
const ruleFormRef = ref<FormInstance>()
const uploadRef = ref<UploadInstance>()

const validURLStr = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;

const rules = ref<FormRules>({
  name: [
    { required: true, message: '名字不能为空！', trigger: 'blur' },
    { max: 15, message: '长度不能超过15个字！', trigger: 'blur' }
  ],
  introduction: [
    { max: 50, message: '长度不能超过50个字！', trigger: 'blur' }
  ],
  link: [
    { required: true, message: '链接不能为空！', trigger: 'blur' },
    { pattern: validURLStr, message: '请填入合法的URL(例：https://www.baidu.com)', trigger: 'blur' }
  ]
})
const confirm = async (formRules: FormInstance | undefined) => {
  if (!formRules) return;
  await formRules.validate((valid, fields) => {
    if (valid) {
      const formData = new FormData();
      if (imgFile.value) {
        formData.append('img', imgFile.value);
      } else if (form.value.img) {
        formData.append('img', form.value.img);
      }
      formData.append('id', form.value.id + '');
      formData.append('name', form.value.name);
      formData.append('introduction', form.value.introduction);
      formData.append('link', form.value.link);
      if (dialogType.value === 1) {
        addFriendApi(formData).then(res => {
          const data = res.data;
          RefreshList(data);
        });
      } else if (dialogType.value === 2) {
        updateFriendApi(formData).then(res => {
          const data = res.data;
          RefreshList(data);
        });
      }
    }
  })
}
const dialogClose = () => {
  imgFile.value = null;
  clearForm();
}

//删除友链
const deleteFriend = (id: number, name: string) => {
  ElMessageBox.confirm(`确认删除分类 ${name} 吗？`, '提示', {
    confirmButtonText: '确认删除',
    confirmButtonClass: 'confirm-remove-button',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      deleteFriendApi(id).then(res => {
        const data = res.data;
        RefreshList(data);
      });
    })
    .catch(() => { })
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
  form.value.img = URL.createObjectURL(uploadFile.raw!);
}

//分页函数
const currentChange = (page: number) => {
  pageOptions.offset = (page - 1) * pageOptions.limit;
  getFriendList(pageOptions.limit, pageOptions.offset);

}
</script>

<style scoped lang='scss'>
.friend-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .container {
    width: 100%;
    height: 0;
    flex: 1;

    ::v-deep(.el-scrollbar) {
      .el-scrollbar__view {
        height: 100%;
      }

      .el-card {
        height: 100%;
        border-radius: 20px;

        .el-card__body {
          display: flex;
          flex-shrink: 0;
          justify-content: space-around;
          align-items: center;
        }
      }

    }

    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      flex-shrink: 0;
      padding: 20px;
      width: 100%;
      height: 100%;
      border-radius: 20px;
      background-color: #fff;

      li {
        margin-right: 10px;
        width: 23%;
        height: 130px;
        border-radius: 20px;
        cursor: pointer;

        &:nth-child(4n) {
          margin-right: 0;
        }

        &.friend {
          position: relative;

          .left {
            margin-right: 10px;
            height: 100%;

            img {
              width: 70px;
              height: 70px;
              object-fit: contain;
              border-radius: 50%;
            }
          }

          .right {
            width: 0;
            flex: 1;

            .name {
              span {
                color: var(--index-blue);
                font-size: 22px;
                font-weight: bold;
              }
            }

            .introduction {
              span {
                color: black;
                line-height: 26px;
              }
            }
          }

          .action {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 20px;

            .dropdown-link {
              cursor: pointer;
              color: #909399;
              display: flex;
              align-items: center;
            }
          }
        }

        .add {
          --add-color: #e4e7ed;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 130px;
          height: 130px;
          border-radius: 20px;
          border: 2px dashed var(--add-color);

          &:hover {
            --add-color: var(--index-blue);
          }
        }
      }
    }
  }

  .pages {
    margin: 10px auto 0;
  }
}
</style>