import type { RouteRecordRaw } from "vue-router";

const route: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("./Index.vue"),
  },
];

export default route;
