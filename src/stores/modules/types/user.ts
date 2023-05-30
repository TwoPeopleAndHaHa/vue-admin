// 引入路由类型
import type { RouteRecordRaw } from "vue-router";

// 小仓库数据 state 的数据类型
export interface UserState {
  token: String | null;
  menuRoutes: RouteRecordRaw[];
}
