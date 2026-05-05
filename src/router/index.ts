/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables

// import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from "vue-router";
import { modules } from "./modules";
import { useAuthStore } from "@/stores/user-auth-store";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: modules,
});

router.beforeEach((to, _, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
