<template>
    <a-layout style="min-height: 100vh">
        <a-layout-content style="padding:0 25px" class="my-scroll">
            <div class="login-container">
                <a-form :model="form" class="login-form" @submit="submit">
                    <h2 class="title">用户登录</h2>
                    <a-form-item :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" label="用户" name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
                        <a-input class="inputBox" v-model:value="form.username">
                            <template #prefix>
                                <UserOutlined type="user" />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" label="密码" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
                        <a-input-password class="inputBox" v-model:value="form.password">
                            <template #prefix>
                                <LockOutlined type="user" />
                            </template>
                        </a-input-password>
                    </a-form-item>

                    <a-form-item :wrapper-col="{ offset: 9, span: 13 }">
                        <a-button class="submit" type="primary" html-type="submit">登录</a-button>
                    </a-form-item >
                    <a-form-item :wrapper-col="{ offset: 9, span: 13 }">
                        <router-link to="/register">
                            <a-button class="submit" type="primary">注册</a-button>
                        </router-link>
                    </a-form-item >
                </a-form>
            </div>
        </a-layout-content>
    </a-layout>
</template>

<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";
import userApi from "@/api/user";
import { message } from "ant-design-vue";
import router from "@/router";
import cookies from 'vue-cookies'
import md5 from "js-md5";


export default defineComponent({
    components: {
        UserOutlined,
        LockOutlined,
    },
    methods:{
        submit() {
            let form_copy = { ...this.form}
            form_copy.password = md5(form_copy.password);
            console.log(form_copy.password);
            userApi.login(form_copy)
                .then((result) => {
                    if (result.code != 200) {
                        message.error("出错了" + result.msg);
                    } else {
                        message.success("登录成功");
                        let userInfo = result.data;
                        cookies.set("userId",userInfo.id);
                        cookies.set("userAvatar",userInfo.avatar);
                        cookies.set("userRole",userInfo.role);
                        router.push("/");
                    }
                })
                .catch((reason) => {
                    message.error("出错了" + reason);
                });
        },
    },
    mounted() {
        
    },

    data() {
        return {
            form: {
                username: "teacher",
                password: "1234567ty",
            },
        };
    },
});
</script>

<style>
/* 背景 */
.login-container {
    position: absolute;
    width: 30%;
    height: 30%;
    top: 20%;
    left: 30%;
}


/* 登陆按钮 */
.submit {
    width: 80%;
    height: 45px;
    font-size: 16px;
}
/* 用户登陆标题 */
.title {
    margin-bottom: 15px;
    color: #1890ff;
    font-weight: 700;
    font-size: 24px;
    font-family: Microsoft Yahei;
    text-align: center;
}
/* 输入框 */
.inputBox {
    height: 45px;
}
.login-form {
    margin: 0 auto;
}
/* 输入框内左边距50px */
.ant-input-affix-wrapper .ant-input:not(:first-child) {
    padding-left: 50px;
    
}
</style>