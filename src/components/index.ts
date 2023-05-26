import { App } from "vue";
import type { Component } from "vue";

import svgIcon from "./SvgIcon/index.vue";
import TestTwo from "./TestTwo/index.vue";

type ComponentsType = {
  [propName: string]: Component;
};
const allComponents: ComponentsType = { svgIcon, TestTwo };

// 对外暴露插件对象
export default {
  install(app: App) {
    Object.keys(allComponents).forEach(item => {
      app.component(item, allComponents[item]);
    });
  }
};
