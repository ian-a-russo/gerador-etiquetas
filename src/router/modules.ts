import type { RouteRecordRaw } from "vue-router";
import ticketGenerator from "@/modules/ticket-generator/route";

export const modules: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/Index.vue"),
    children: [...ticketGenerator],
  },
];
