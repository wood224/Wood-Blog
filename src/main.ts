import { createApp } from 'vue';
import './style.css';
import 'animate.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/element.css';
import './icon/iconfont.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';


import * as ElementPlusIconsVue from '@element-plus/icons-vue';

// 预览组件以及样式
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// VuePress主题以及样式（这里也可以选择github主题）
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// Prism
import Prism from 'prismjs';
// 代码高亮
import 'prismjs/components/prism-json';
// 选择使用主题
VMdPreview.use(vuepressTheme, {
  Prism,
});

const pinia = createPinia();

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 引入v-md-editor预览组件
app.use(VMdPreview);
app.use(pinia);
app.use(router);
app.mount('#app');
