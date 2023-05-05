<template>
  <div class="index-wrapper">
    <Header></Header>
    <div class="view">
      <Menus @add-tab="addTab"></Menus>
      <el-tabs v-model="tabsValue" type="card" class="tabs" closable @tab-click="tabClick" @tab-remove="removeTab">
        <el-tab-pane v-for="item in tabsData" :key="item.name" :label="item.name" :name="item.name">
          <template v-if="tabsValue === item.name">
            <router-view #default="{ Component }" class="router-view">
              <transition name="fade" mode="out-in">
                <keep-alive>
                  <component :is="Component"></component>
                </keep-alive>
              </transition>
            </router-view>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { Menus, Header } from './components';
import { ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
import { useIndexStore } from '@/store'

const router = useRouter();
const store = useIndexStore();

const tabsValue = ref('首页')
const tabsData = ref<{ [key: string]: any }[]>([])

const tabClick = (pane: any, ev: any) => {
  const tab = tabsData.value[pane.index]
  if (tab.id === 0) {
    router.push(tab.routePath);
  } else if (tab.type === 2 && tab.id !== 0) {
    router.push({ path: tab.routePath, query: { type: tab.type, id: tab.id } });
  }
}

const addTab = (name: any, fullPath: string, type?: number, id?: number) => {
  const path = fullPath;
  if (!tabsData.value.some(tab => tab.name === name)) {
    tabsData.value.push({
      name: name,
      routePath: path,
      type: type ?? 1,
      id: id ?? 0,
    })
  }
  tabsValue.value = name;
  if (!store.isEditor) {
    router.push(path);
  } else {
    router.push({ path: path, query: { type, id } });
  }
}
const removeTab = (targetName: string) => {
  const tabs = tabsData.value;
  let activeName = tabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name;
          router.push(nextTab.routePath);
        }
      }
    })
  }
  tabsValue.value = activeName;
  tabsData.value = tabs.filter((tab) => tab.name !== targetName);
}

watch(() => store.isEditor,
  (newValue: boolean, oldValue: boolean) => {
    if (newValue === true) {
      addTab('编辑', '/note/editor', store.editorType, store.editorId)
    }
    store.setIsEditor(false);
  }
)

// onBeforeRouteUpdate((to, form) => {
//   if (JSON.stringify(to.query) !== '{}') {
//     console.log(to.query);

//     const type = Number(to.query.type);
//     const id= Number(to.query.id);
//     const title = to.query.title;
//     store.setIsEditor(true,type,id,)
//     // console.log(store.editorId, store.editorTitle);

//   }

// })
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

    .tabs {
      flex: 1;
      display: flex;
      flex-direction: column;

      ::v-deep(.el-tabs__content) {
        flex: 1;

        .el-tab-pane {
          height: 100%;
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