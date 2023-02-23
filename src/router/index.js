import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomePage.vue"),
    },
    {
      path: "/products/:id",
      name: "product",
      component: () => import("../views/ProductPage.vue"),
    },
    {
      path: "/thankyou",
      name: "thankyou",
      component: () => import("../views/ThankYou.vue"),
    }
  ],
});

export default router;
