import { createApp } from 'vue';
import './style.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/element.css';
import './icon/iconfont.css';
import 'animate.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(pinia);
app.use(router);
app.mount('#app');
