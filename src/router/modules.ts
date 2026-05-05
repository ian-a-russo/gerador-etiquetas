import type { RouteRecordRaw } from "vue-router";
import ticketGenerator from "@/modules/ticket-generator/route";
import login from "@/modules/login/route";

export const modules: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/generate",
  },
  {
    path: "/generate",
    component: () => import("@/layouts/Index.vue"),
    meta: { requiresAuth: true },
    children: [...ticketGenerator],
  },
  {
    path: "/login",
    children: [...login],
  },
];
