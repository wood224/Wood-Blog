import { createApp } from 'vue';
import './style.css';
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'font-awesome/css/font-awesome.min.css';
import './css/element.css';
import './icon/iconfont.css';
import 'animate.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
// highlightjs
import hljs from 'highlight.js';
VMdPreview.use(githubTheme, {
  Hljs: hljs,
  codeHighlightExtensionMap: {
    vue: 'html',
  },
});

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 引入v-md-editor预览组件
app.use(VMdPreview);
app.use(pinia);
app.use(router);
app.mount('#app');
