import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../layout/Index.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    redirect: { name: 'home' },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          icon: 'fa-home',
          title: '首页',
          children: [],
        },
        component: () => import('../views/Index/Home/Home.vue')
      },
      {
        path: 'note',
        name: 'note',
        redirect: { name: 'overview' },
        meta: {
          icon: 'fa-sticky-note',
          title: '笔记',
          children: [],
        },
        children: [
          {
            path: 'editor',
            name: 'editor',
            meta: {
              title: '编辑'
            },
            component: () => import('../views/Index/Note/Editor/Editor.vue'),
          },
          {
            path: 'overview',
            name: 'overview',
            meta: {
              title: '笔记总览',
            },
            component: () => import('../views/Index/Note/Overview/Overview.vue')
          },
          {
            path: 'category',
            name: 'category',
            meta: {
              title: '分类管理',
            },
            component: () => import('../views/Index/Note/Category/Category.vue')
          },
          {
            path: 'tag',
            name: 'tag',
            meta: {
              title: '标签管理',
            },
            component: () => import('../views/Index/Note/Tag/Tag.vue')
          },
        ]
      },
      {
        path: 'info',
        name: 'info',
        meta: {
          icon: 'fa-info-circle',
          title: '个人信息',
          children: [],
        },
        component: () => import('../views/Index/Info/Info.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


export default router;
