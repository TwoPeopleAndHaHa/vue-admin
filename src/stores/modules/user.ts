// 引入定义的类型
import type { UserState } from "./types/user";
// 引入常量路由
import { statisRouters } from "@/routers/modules/statsRouter";
import { defineStore } from "pinia";

// 创建用户仓库
let useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      token: "",
      menuRoutes: statisRouters
    };
  },
  //  异步使用方法
  actions: {},
  //
  getters: {}
});
export default useUserStore;
