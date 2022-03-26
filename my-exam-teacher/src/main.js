import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import Editor from "@tinymce/tinymce-vue"
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
app.use(store).use(router).use(Antd).use(Editor);
app.mount("#app");
