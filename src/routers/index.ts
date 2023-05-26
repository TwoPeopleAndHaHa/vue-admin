import { createRouter, createWebHistory } from "vue-router";
import { statisRouters } from "./modules/statsRouter";

const router = createRouter({
  history: createWebHistory(),
  routes: [...statisRouters],
  scrollBehavior: () => ({ left: 0, top: 0 })
});

export default router;
