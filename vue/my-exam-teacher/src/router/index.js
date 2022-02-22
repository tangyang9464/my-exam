import { createRouter, createWebHashHistory } from "vue-router";
import Test from "../views/Test.vue";
import Courses from "../views/Courses.vue";
import Papers from "@/views/paper/Papers.vue";
import PaperDetail from "../views/paper/PaperDetail.vue";

const routes = [
  {
    path: "/",
    name: "Test",
    component: Test,
  },
  {
    path: "/courses",
    name: "Courses",
    component: Courses,
  },
  {
    path: "/papers",
    name: "Papers",
    component: Papers,
  },
  {
    path: "/paperDetail",
    name: "PaperDetail",
    component: PaperDetail,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
