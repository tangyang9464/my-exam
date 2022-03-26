import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import 'ant-design-vue/dist/antd.css';
import cookies from 'vue-cookies'
import { message } from "ant-design-vue";

// require("./mock/classroom");
// require("./mock/paper");
// require("./mock/record");
// require("./mock/user");

const app = createApp(App);
app.config.globalProperties.$cookies = cookies;
app.config.globalProperties.$message = message;
app.use(store).use(router).use(Antd);
// 屏蔽警告信息
app.config.warnHandler = () => null;
app.mount("#app");

