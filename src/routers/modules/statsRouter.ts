// 引入 ts 类型
import { RouteRecordRaw } from "vue-router";

export const statisRouters: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/layouts/index.vue"),
    redirect: "home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue")
      }
    ]
  }
];
