<template>
    <a-layout-sider theme="dark" width="150" v-if="route.path != '/login' && route.path != '/register'" style="border-right: 2px solid #f0f2f5;">
        <a-dropdown>
            <a-avatar style="margin:15px 30px;" :size="40">
                <template #icon>
                    <img :src="'http://localhost:9090/upload/'+userAvatar" alt="">
                </template>
            </a-avatar>
            <template #overlay>
                <a-menu>
                    <a-menu-item>
                        <div class="my-hover" @click="userCenter()">个人中心</div>
                    </a-menu-item>
                    <a-menu-item>
                        <div class="my-hover" @click="signOut()">退出登录</div>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>

        <a-menu mode="inline" theme="dark">
            <a-menu-item key="1">
                <!-- <PlayCircleOutlined style="font-size: 17px;margin-right: 5px;"/> -->
                <router-link to="/courses" style="font-size: 17px;">课程班级</router-link>
            </a-menu-item>
            <a-menu-item key="2" v-if="role==1">
                <!-- <SnippetsOutlined /> -->
                <router-link to="/metaPapers" style="font-size: 17px;">试卷库</router-link>
            </a-menu-item>
            <div v-else>
                <a-menu-item key="2">
                    <!-- <AlertOutlined style="font-size: 17px;margin-right: 5px;" /> -->
                    <router-link to="/papers" style="font-size: 17px;">待做试卷</router-link>
                </a-menu-item>
                <a-menu-item key="3">
                    <!-- <SnippetsOutlined style="font-size: 17px;margin-right: 5px;"/> -->
                    <router-link to="/records" style="font-size: 17px;">考试记录</router-link>
                </a-menu-item>
            </div>
            <!-- <a-menu-item key="4">
                <router-link to="">错题本</router-link>
            </a-menu-item> -->
        </a-menu>
    </a-layout-sider>
</template>

<script>
import router from "@/router";
import cookies from "vue-cookies";
import userApi from "@/api/user";
import { message } from "ant-design-vue";
import { useRoute } from "vue-router";
// import {PlayCircleOutlined, SnippetsOutlined,AlertOutlined } from '@ant-design/icons-vue';
export default {
    components:{
        // PlayCircleOutlined,
        // SnippetsOutlined,
        // AlertOutlined
    },
    watch: {
        $route: {
            handler(route) {
                console.log(route.path);
                if (route !=undefined && route.path == "/") {
                    this.updateUser();
                }
            },
            immediate: true, // 此项须设置为true
        },
    },
    data() {
        return {
            userId: "",
            route: "",
            userAvatar: "default_avatar.jpg",
            role: "0",
        };
    },
    methods: {
        userCenter() {
            router.push("/userCenter");
        },
        signOut() {
            let params = {
                userId: this.userId,
            };
            cookies.remove("userId");
            cookies.remove("userAvatar");
            userApi
                .signOut(params)
                .then((result) => {
                    if (result.code != 200) {
                        message.warning("出错了" + result.msg);
                    }
                    router.push("/login");
                })
                .catch((reason) => {
                    message.error("加入课堂出错了" + reason);
                });
        },
        updateUser() {
            this.userId = cookies.get("userId");
            this.role = cookies.get("userRole");
            if (this.userId == undefined) {
                return;
            }
            let avatar = cookies.get("userAvatar");
            if (avatar != undefined && avatar != "") {
                this.userAvatar = avatar;
            }
        },
    },
    mounted() {
        this.route = useRoute();
        this.updateUser();
    },
};
</script>

<style>
</style>