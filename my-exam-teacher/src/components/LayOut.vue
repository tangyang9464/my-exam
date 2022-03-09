<template>
    <a-layout style="min-height: 100vh">
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0" />
            <a-layout-content>
                <a-row type="flex" justify="space-around" align="vetical">
                    <a-col>
                        <List></List>
                    </a-col>
                   <a-col>
                        <List></List>
                    </a-col>
                    <a-col>
                        <List></List>
                    </a-col>
                </a-row>
            </a-layout-content>
        </a-layout>

        <a-layout v-if="false">
            <a-layout-header style="background: #fff; padding: 0" />
            <a-layout-content>
                <a-row type="flex" justify="space-around" align="middle">
                    <a-col>
                        <Card></Card>
                    </a-col>
                    <a-col>
                        <Card></Card>
                    </a-col>
                    <a-col>
                        <Card></Card>
                    </a-col>
                    <a-col>
                        <Card></Card>
                    </a-col>
                </a-row>
                <a-row type="flex" justify="space-around" align="middle">
                    <a-col>
                        <Card></Card>
                    </a-col>
                    <a-col>
                        <Card></Card>
                    </a-col>
                    <a-col>
                        <Card></Card>
                    </a-col>
                    <a-col>
                        <Card></Card>
                    </a-col>
                </a-row>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import Avatar from "./Avatar.vue";
import Card from "./Card.vue";
import List from "./MyList.vue";

export default defineComponent({
    components: {
        PieChartOutlined,
        DesktopOutlined,
        UserOutlined,
        TeamOutlined,
        FileOutlined,
        Avatar,
        Card,
        List,
    },

    data() {
        return {
            collapsed: ref(false),
            selectedKeys: ref(["1"]),
        };
    },
});
</script>
<style>


#components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
    background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
    background: #141414;
}
</style>