import { createApp } from "vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import * as Icons from "@element-plus/icons-vue";

// 引入 iconSvg 为全局组件
import SvgIcon from "@/components/SvgIcon/index.vue";

import App from "./App.vue";
// 路由
import router from "./routers";
// pinia
import pinia from "@/stores/index";

// element css
import "element-plus/dist/index.css";
// element dark(内置暗黑模式)
import "element-plus/theme-chalk/dark/css-vars.css";
// custom  dark(自定义暗黑模式)
import "@/styles/theme/dark.scss";
// Element 样式
import "@/styles/element.scss";
// iconfont
import "@/assets/iconfont/iconfont.scss";
// 公共样式
import "@/styles/common.scss";
// 初始样式
import "@/styles/reset.scss";

// 这里要注意把 submenu 注册成全局组件 , 因为是递归使用
import SubMenu from "./layouts/components/SubMenu/index.vue";

const app = createApp(App);

for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component);
}
app.component("SubMenu", SubMenu);

app.use(ElementPlus);
app.use(router);
app.use(pinia);

app.component("SvgIcon", SvgIcon);
app.mount("#app");
