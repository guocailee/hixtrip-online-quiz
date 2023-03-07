import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    name: "index",
    path: "/",
    redirect: "/userManagement",
    children: [
      {
        name: "userManagement",
        path: "/userManagement",
        component: () => import("@/views/userManagement/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
