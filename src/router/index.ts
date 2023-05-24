import { createRouter, createWebHashHistory } from 'vue-router'
import Blog from '@/layout/Blog.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    meta: {
      title: '首页',
      icon: 'fa-home'
    },
    component: () => import('@/view/Index/Index.vue')
  },
  {
    path: '/blog',
    name: 'blog',
    redirect: { name: 'home' },
    component: Blog,
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '博客',
          icon: 'fa-file-code-o'
        },
        component: () => import('@/view/Blog/Home/Home.vue')
      },
      {
        path: 'common',
        name: 'common',
        meta: {
          title: '分类',
          icon: 'fa-bars'
        },
        component: () => import('@/view/Blog/Common/Common.vue')
      },
      {
        path: 'archive',
        name: 'archive',
        meta: {
          title: '归档',
          icon: 'fa-camera-retro'
        },
        component: () => import('@/view/Blog/Archive/Archive.vue')
      },
      {
        path: 'about',
        name: 'about',
        meta: {
          title: '关于',
          icon: 'fa-user-circle-o'
        },
        component: () => import('@/view/Blog/About/About.vue')
      },
      {
        path: 'note',
        name: 'note',
        meta: {
          title: '笔记',
          icon: '',
          hidden: true
        },
        component: () => import('@/view/Blog/Note/Note.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (from.name === 'note' && to.name !== 'note') {
    document.title = '博客-Wood Blog';
  }
  next();
})

export default router;
