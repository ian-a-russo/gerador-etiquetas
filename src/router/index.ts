/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables

// import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from "vue-router";
import { modules } from "./modules";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: modules,
});

export default router;
