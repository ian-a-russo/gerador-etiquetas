import type { RouteRecordRaw } from "vue-router";

const route: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("./Index.vue"),
  },
];

export default route;
