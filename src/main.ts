import { createApp } from "vue";
import { createPinia } from "pinia";

// 全局完整引入 ElementPlus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 引入 ElementPlusIcons
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
//  暗黑模式
import "element-plus/theme-chalk/dark/css-vars.css";

import App from "./App.vue";
import router from "./routers";

// 引入 svg 注册脚本
import "virtual:svg-icons-register";
// 引入自定义插件 , 并通过 use 使用
import globalComponent from "@/components/index";

// 初始样式
import "@/styles/reset.less";
// 全局样式
import "@/styles/global.less";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 挂在到 vue 实例
app.use(createPinia()).use(globalComponent);
app.use(router).use(ElementPlus);

app.mount("#app");
