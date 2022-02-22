import { createRouter, createWebHashHistory } from "vue-router";
import Courses from "../views/course/Courses.vue";
import Papers from "../views/paper/Papers.vue";
import Records from "../views/record/ExamRecord.vue";
import CourseDetail from "../views/course/CourseDetail.vue";
import PaperDetail from "../views/paper/PaperDetail.vue";

const routes = [
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
    path: "/records",
    name: "Records",
    component: Records,
  },
  {
    path: "/courseDetail/:roomCode",
    name: "CourseDetail",
    component: CourseDetail,
  },
  {
    path: "/paperDetail/:paperId",
    name: "PaperDetail",
    component: PaperDetail,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
