// 引入 ts 类型
import { RouteRecordRaw } from "vue-router";

export const statisRouters: Array<RouteRecordRaw> = [
  // 登录
  {
    path: "/login",
    name: "login",
    meta: {
      isHidden: true
    },
    component: () => import("@/views/login/index.vue")
  },
  // 登录成功后展示的首页
  {
    path: "/",
    name: "layout",
    redirect: "home",
    meta: {
      icon: "HomeFilled",
      isHidden: true
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "首页",
          isHidden: false
        },
        component: () => import("@/views/home/index.vue")
      }
    ]
  },
  {
    path: "/echarts",
    name: "echarts",
    meta: {
      title: "echarts",
      isHidden: false,
      icon: "Histogram"
    },
    component: () => import("@/views/echarts/index.vue")
  },
  {
    path: "/test",
    name: "test",
    meta: {
      title: "test",
      isHidden: false,
      icon: "Tools"
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "/test_1",
        name: "test_1",
        meta: {
          title: "test_1",
          isHidden: false,
          icon: "Tools"
        },
        component: () => import("@/views/test/test1/index.vue")
      },
      {
        path: "/test_2",
        name: "test_2",
        meta: {
          title: "test_2",
          isHidden: false,
          icon: "Tools"
        },
        component: () => import("@/views/test/test2/index.vue")
      }
    ]
  },
  {
    path: "/todo",
    redirect: "todo",
    meta: {
      isHidden: true
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "/todo",
        name: "todo",
        meta: {
          title: "todo",
          isHidden: false
        },
        component: () => import("@/views/todo/index.vue")
      }
    ]
  },
  {
    path: "/page404",
    name: "page404",
    meta: {
      isHidden: true
    },
    component: () => import("@/views/error/index.vue")
  },
  {
    // 匹配路由
    path: "/:pathMatch(.*)*",
    redirect: "page404",
    name: "any",
    meta: {
      isHidden: true
    }
  }
];
