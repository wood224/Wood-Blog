<template>
  <div class="index-wrapper">
    <Header></Header>
    <div class="view">
      <Menus @addTab="addTab"></Menus>

      <div class="tab-wrapper">
        <el-tabs v-model="activeName" type="border-card" :closable="tabsData.length > 1" class="demo-tabs"
          :before-leave="handleBeforeLeave" @tab-click="handleClick" @tab-remove="handleRemove">
          <el-tab-pane v-for="item in tabsData" :label="item.name" :name="item.name"></el-tab-pane>
        </el-tabs>
        <router-view #default="{ Component }" class="router-view">
          <transition name="fade" mode="out-in">
            <keep-alive>
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';
import { Menus, Header } from './components';
import { useRouter } from 'vue-router';
import { useIndexStore } from '@/store';

const router = useRouter();
const store = useIndexStore();

//路由跳转函数
const routerPush = (tab: any) => {
  if (tab.name !== '编辑' || store.editorType === 1) {
    store.setIsEditor(false, store.editorType, store.editorId);   //保存编辑的状态type和修改的笔记id
    return router.push(tab.path);
  }
  if (store.editorType === 2) {
    return router.push({ path: tab.path, query: { type: store.editorType, id: store.editorId } })
  }
}

const oldName = ref('')
const handleBeforeLeave = (activeName: string, oldActiveName: string) => {
  oldName.value = oldActiveName;  //保存之前的标签
}
const handleClick = async (pane: any) => {
  const tab = tabsData.value[pane.index];
  let res = false;
  if (store.editorChange) {
    res = await ElMessageBox.confirm('有修改未提交，确定离开吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(() => {
      store.setEditorChange(false);
      return true;
    }).catch(() => {
      return false;
    });
  }
  else {
    res = true
  }
  if (res) return routerPush(tab);
  else return activeName.value = oldName.value; //回到之前的标签
}
const handleRemove = (name: any) => {
  const tabs = tabsData.value
  if (activeName.value === name) {
    tabs.forEach((tab, index) => {
      if (tab.name === name) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName.value = nextTab.name
          routerPush(nextTab);
        }
      }
    })
  }
  tabsData.value = tabs.filter((tab) => tab.name !== name)
}

const tabsData = ref([
  {
    name: '首页',
    path: '/home'
  }
])
const activeName = ref(tabsData.value[0].name);
const addTab = (name: string, path: string, type?: number, id?: number) => {
  if (!tabsData.value.some(tab => tab.name === name)) {
    tabsData.value.push({
      name: name,
      path: path
    });
  }
  activeName.value = name;
  if (type === 2 && id !== 0) return router.push({ path: path, query: { type, id } })
  router.push(path);
}

watch(() => store.isEditor,
  (newValue: boolean, oldValue: boolean) => {
    if (newValue === true) {
      if (store.editorType === 2) {
        addTab('编辑', '/note/editor', store.editorType, store.editorId)
      }
      else {
        addTab('编辑', '/note/editor');
      }
    }
  }
)

onMounted(() => {
  router.push('/home');
})

</script>

<style scoped lang='scss'>
.index-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .view {
    display: flex;
    flex: 1;
    overflow: hidden;

    .tab-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;

      ::v-deep(.el-tabs) {
        &>.el-tabs__content {
          padding: 0;
        }
      }

      .router-view {
        flex: 1;
      }
    }

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.4s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }
  }
}
</style>