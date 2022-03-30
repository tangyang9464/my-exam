import { createRouter, createWebHashHistory } from "vue-router";
import Courses from "../views/course/Courses.vue";
import Papers from "../views/paper/student/Papers.vue";
import Records from "../views/record/ExamRecord.vue";
import CourseDetail from "../views/course/CourseDetail.vue";
import PaperDetail from "../views/paper/student/PaperDetail.vue";
import Login from "../views/login/Login.vue";
import Register from "../views/login/Register.vue";
import UserCenter from "../views/user/UserCenter.vue";
import MetaPaper from "../views/paper/teacher/MetaPaper"
import MetaPaperDetail from "../views/paper/teacher/MetaPaperDetail"
import SummaryTeacherPaper from "../views/paper/teacher/SummaryTeacherPaper"
import test from "../views/paper/teacher/test"
import cookies from 'vue-cookies'

const routes = [
  {
    path: "/test",
    name: "test",
    component: test,
  },
  {
    path: "/summaryPaper/:paperId",
    name: "summaryPaper",
    component: SummaryTeacherPaper,
  },
  {
    path: "/metaPaperDetail/:paperId",
    name: "metaPaperDetail",
    component: MetaPaperDetail,
  },
  {
    path: "/metaPapers",
    name: "metaPapers",
    component: MetaPaper,
  },
  {
    path: "/userCenter",
    name: "userCenter",
    component: UserCenter,
  },
  {
    path: "/",
    name: "index",
    component: Courses,
  },
  {
    path: "/courses",
    name: "Courses",
    component: Courses,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
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
    path: "/courseDetail/:roomId",
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

router.beforeEach((to, from, next) => {
  // 判断有没有登录
  const isLogin = cookies.get("userId") ? true : false;
  // 如果当前访问的是登录页面或者注册页面可以让它进入
  if (to.path == '/login' || to.path == "/register") {
      next()
  } else {
      // if(!isLogin){
      //   message.error("请先登录");
      // }
      isLogin ? next() : next('/login')
  }
});

export default router;
