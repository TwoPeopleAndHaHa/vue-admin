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
    path: "/nested",
    name: "nested",
    meta: {
      title: "嵌套路由",
      isHidden: false,
      icon: "Tools"
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "/nested_1",
        name: "nested_1",
        redirect: "/nested1_1",
        meta: {
          title: "nested_1",
          isHidden: false,
          icon: "Tools"
        },
        component: () => import("@/views/nested/nested1/index.vue"),
        children: [
          {
            path: "/nested1_1",
            name: "nested1_1",
            meta: {
              title: "nested1_1",
              isHidden: false,
              icon: "Tools"
            },
            component: () => import("@/views/nested/nested1/nested1_1/index.vue")
          },
          {
            path: "/nested1_2",
            name: "nested1_2",
            meta: {
              title: "nested1_2",
              isHidden: false,
              icon: "Tools"
            },
            component: () => import("@/views/nested/nested1/nested1_2/index.vue")
          }
        ]
      },
      {
        path: "/nested_2",
        name: "nested_2",
        meta: {
          title: "nested_2",
          isHidden: false,
          icon: "Tools"
        },
        component: () => import("@/views/nested/nested2/index.vue")
      }
    ]
  },
  {
    path: "/upload",
    redirect: "upload",
    meta: {
      isHidden: true,
      icon: "Tools"
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "/upload",
        name: "upload",
        meta: {
          title: "上传组件",
          isHidden: false
        },
        component: () => import("@/views/upload/index.vue")
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
