<template>
    <a-layout style="min-height: 100vh">
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0; height: 170px;">
                <a-typography-title :level="3">操作系统</a-typography-title>

                <a-row type="flex">
                    <a-col :span="2">
                        <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        <span>王小明</span>
                    </a-col>
                    <a-col :span="2">
                        <HomeFilled />
                        <span>183班级</span>
                    </a-col>
                </a-row>

                <a-row type="flex">
                    <a-menu v-model:selectedKeys="current" mode="horizontal">
                        <a-menu-item key="mail">
                            <template #icon>
                                <mail-outlined />
                            </template>
                            试卷
                        </a-menu-item>
                        <a-menu-item key="app" disabled>
                            <template #icon>
                                <appstore-outlined />
                            </template>
                            Navigation
                        </a-menu-item>
                    </a-menu>
                </a-row>
            </a-layout-header>
            
            <a-layout-content>

            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import {
    HomeFilled,
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from "@ant-design/icons-vue";
import { defineComponent} from "vue";
export default defineComponent({
    components: {
        HomeFilled,
        MailOutlined,
        AppstoreOutlined,
        SettingOutlined,
    },
});
</script>

<style>
</style>