<template>
    <a-layout style="min-height: 100vh">
        <a-layout-content style="padding:0 25px" class="my-scroll">
            <div class="login-container">
                <a-form :model="userInfo" class="login-form" @submit="submit">
                    <h2 class="title">用户信息</h2>
                    <a-form-item :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" label="用户头像" style="height:height: 60px;">
                        <a-upload v-model:file-list="fileList" name="avatar" list-type="picture-card" class="avatar-uploader" :show-upload-list="false" :customRequest="uploadImg" @change="handleChange">
                            <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="avatarImg"/>
                            <div v-else>
                                <loading-outlined v-if="loading"></loading-outlined>
                                <plus-outlined v-else></plus-outlined>
                                <div class="ant-upload-text">上传头像</div>
                            </div>
                        </a-upload>   
                    </a-form-item>
                    <a-form-item :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" label="用户名" name="username" >
                        <a-input disabled="false" class="inputBox" v-model:value="userInfo.username">
                        </a-input>
                    </a-form-item>
                    <a-form-item :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" label="昵称" name="displayName" >
                        <a-input class="inputBox" v-model:value="userInfo.displayName">
                        </a-input>
                    </a-form-item>
                    <!-- <a-form-item :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" label="密码" name="password" >
                        <a-input-password class="inputBox" v-model:value="userInfo.password">
                        </a-input-password>
                    </a-form-item> -->
                    <a-form-item :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" label="角色" name="role" >
                        <a-select disabled="false" v-model:value="userInfo.role" defaultActiveFirstOption="true">
                            <a-select-option value="0">学生</a-select-option>
                            <a-select-option value="1">老师</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" label="学号">
                        <a-input class="inputBox" v-model:value="userInfo.number">
                        </a-input>
                    </a-form-item>
                    <a-form-item :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" label="学校">
                        <a-input class="inputBox" v-model:value="userInfo.school">
                        </a-input>
                    </a-form-item>
                    <a-form-item :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" label="邮箱">
                        <a-input class="inputBox" v-model:value="userInfo.email">
                        </a-input>
                    </a-form-item>

                    <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
                        <a-button type="primary" html-type="submit">保存</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </a-layout-content>
    </a-layout>
</template>

<script>
import { defineComponent } from "vue";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import userApi from "@/api/user";
import { message } from "ant-design-vue";
import cookies from 'vue-cookies'

export default defineComponent({
    components: {PlusOutlined, LoadingOutlined},
    methods: {
        uploadImg(data) {
            let formdata = new FormData()
            var file = new File([data.file], Date.now()+".jpg");
            var vue = this;
            formdata.append('file', file)
            userApi.uploadImg(formdata).then(res => {
                if (res.code === 200) { // 上传成功时（自己封装了response）
                    vue.fileList[0].name = file.name;
                    data.onSuccess(res.data);
                }else {
                    data.onError();
                }
            })
        },
        submit() {
            let form_copy = { ...this.userInfo}
            if(this.fileList.length>0){
                form_copy.avatar = this.fileList[0].name;
                cookies.set("userAvatar",form_copy.avatar);
            }
            form_copy.role=form_copy.role=='学生'?0:1;
            userApi
                .saveUserInfo(form_copy)
                .then((result) => {
                    if (result.code != 200) {
                        message.error("出错了" + result.msg);
                    } else {
                        message.success("保存成功");
                    }
                })
                .catch((reason) => {
                    message.error("出错了" + reason);
                });
        },
        getBase64(img, callback) {
            const reader = new FileReader();
            reader.addEventListener('load', () => callback(reader.result));
            reader.readAsDataURL(img);
        },
        handleChange(info){
            if (info.file.status === 'uploading') {
                this.loading = true;
                return;
            }

            if (info.file.status === 'done') {
                // Get this url from response in real world.
                this.getBase64(info.file.originFileObj, base64Url => {
                    this.imageUrl = base64Url;
                    this.loading = false;
                });
            }

            if (info.file.status === 'error') {
                this.loading = false;
                message.error('upload error');
            }
        },
        getUser(){
            let params={
                userId:this.userId
            }
            userApi
                .getUser(params)
                .then((result) => {
                    if (result.code != 200) {
                        message.error("出错了" + result.msg);
                    } else {
                        this.userInfo = result.data;
                        this.userInfo.role = this.userInfo.role==0 ? '学生':'老师';
                        if(this.userInfo.avatar!=undefined || this.userInfo.avatar!=''){
                            this.imageUrl = 'http://localhost:9090/upload/'+this.userInfo.avatar;
                        }
                    }
                })
                .catch((reason) => {
                    message.error("出错了" + reason);
                });
        }
    },
    data() {
        return {
            userId:'',
            fileList:[],
            loading:false,
            imageUrl:'/default_avatar.png',
            userInfo: {},
        };
    },
    mounted(){
        this.userId = cookies.get("userId");
        this.getUser();
    }
});
</script>

<style>
/* 背景 */
.login-container {
    position: absolute;
    width: 30%;
    height: 30%;
    top: 10%;
    left: 30%;
}

/* 用户登陆标题 */
.title {
    margin-bottom: 15px;
    color: #1890ff;
    font-weight: 700;
    font-size: 24px;
    font-family: Microsoft Yahei;
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
.ant-upload.ant-upload-select-picture-card {
    width: 64px !important;
    height: 64px !important;
    border-radius: 100% !important;
    border: none !important;
}
.avatarImg{
    width: 64px !important;
    height: 64px !important;
    border-radius: 100% !important;
}
.ant-upload.ant-upload-select-picture-card > .ant-upload {
    padding: 0 !important;
}
.ant-form-item {
    margin-bottom: 10px !important;
}
</style>