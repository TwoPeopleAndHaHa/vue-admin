import { createRouter, createWebHistory } from "vue-router";
import { statisRouters } from "./modules/statsRouter";
import { GlobalStore } from "@/stores/modules/global";

const router = createRouter({
  history: createWebHistory(),
  routes: [...statisRouters],
  scrollBehavior: () => ({ left: 0, top: 0 })
});
/**
 * @description 前置路由守卫
 */
router.beforeEach((to, from, next) => {
  const globalStore = GlobalStore();
  if (to.path.toLocaleLowerCase() === "/login") {
    if (globalStore.token) return next(from.fullPath);
    next();
  }
  if (to.path.toLocaleLowerCase() !== "/login") {
    if (globalStore.token) return next();
    router.replace("login");
  }
  // 白名单页面 目前只有网络失败的 500 时跳转
  const ROUTER_WHITE_LIST = ["/500", "/404"];
  if (ROUTER_WHITE_LIST.includes(to.path)) return next();
});
export default router;
