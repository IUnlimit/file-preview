import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/", // 默认路由 home页面
    component: () => import("../components/Index.vue"),
  },
  {
    path: "/code", // 默认路由 home页面
    component: () => import("../components/Code.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 导出路由 去 main.ts 注册
export default router;
