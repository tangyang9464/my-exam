<template>
    <a-layout-sider collapsible width="100">
        <a-avatar style="margin:15px 30px;" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" :size="40" />
        <a-menu  theme="dark" mode="inline" >
            <a-menu-item key="1">
                <router-link to="/courses">课程班级</router-link>
            </a-menu-item>
            <a-menu-item key="2">
                <router-link to="/papers">待做试卷</router-link>
            </a-menu-item>
            <a-menu-item key="3">
                <router-link to="/records">考试记录</router-link>
            </a-menu-item>
            <!-- <a-menu-item key="4">
                <router-link to="">错题本</router-link>
            </a-menu-item> -->
        </a-menu>
    </a-layout-sider>
</template>

<script>
export default {
    name: "",
    data() {
        return {};
    },
};
</script>

<style>
</style>