<template>
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <div class="logo" />
        <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }">
            <template #icon>
                <AntDesignOutlined />
            </template>
        </a-avatar>
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
            <a-menu-item key="1">
                <pie-chart-outlined />
                <router-link to="courses">课程班级</router-link>
            </a-menu-item>
            <a-menu-item key="2">
                <desktop-outlined />
                <router-link to="papers">试卷库</router-link>
            </a-menu-item>
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