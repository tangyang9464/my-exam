<template>
    <a-layout style="min-height: 100vh">
        <a-layout>
            <a-layout-header class="my-header">
                <a-row type="flex" justify="space-between">
                    <a-col>
                        <a-tabs v-model:activeKey="activeKey">
                            <a-tab-pane key="1" tab="我教的课">
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="我听的课">
                            </a-tab-pane>
                        </a-tabs>
                    </a-col>
                    <a-col>
                        <a-row type="flex" align="right" :gutter="20">
                            <a-col>
                                <a-typography-text @click='showModal("courseVisible")'>
                                    历史课堂
                                </a-typography-text>

                                <a-modal v-model:visible="courseVisible" @ok='handleOk("courseVisible")' :footer="null" >
                                    <a-typography-title :level="4" style="margin-bottom: 20px">
                                        历史课堂
                                    </a-typography-title>

                                    <a-card>
                                        <a-typography-title :level="5">
                                            数据挖掘与应用
                                        </a-typography-title>

                                        <a-row type="flex" justify="space-between" :gutter="80">
                                            <a-col>
                                                2021春-计算机181
                                            </a-col>
                                            <a-col>
                                                124人
                                            </a-col>
                                            <a-col>
                                                移出
                                            </a-col>
                                        </a-row>
                                    </a-card>
                                    <a-card>
                                        <a-typography-title :level="5">
                                            数据挖掘与应用
                                        </a-typography-title>

                                        <a-row type="flex" justify="space-between" :gutter="80">
                                            <a-col>
                                                2021春-计算机181
                                            </a-col>
                                            <a-col>
                                                124人
                                            </a-col>
                                            <a-col>
                                                移出
                                            </a-col>
                                        </a-row>
                                    </a-card>
                                </a-modal>
                            </a-col>

                            <a-col>
                                <a-typography-text @click="showModal">
                                    加入课堂
                                </a-typography-text>

                                <a-modal v-model:visible="addCourseVisible" title="加入班级" @ok="handleOk" ok-text="确认" cancel-text="取消">
                                    <a-typography-title :level="5">
                                        课堂暗号
                                    </a-typography-title>
                                    <a-input v-model:value="value" />
                                </a-modal>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </a-layout-header>

            <a-layout-content style="padding:0 25px">
                <a-row type="flex" justify="space-around" align="middle">
                    <a-col>
                        <router-link to="courseDetail">
                            <Card></Card>
                        </router-link>
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
import Avatar from "@/components/Avatar.vue";
import Card from "@/components/Card.vue";
import List from "@/components/MyList.vue";

export default defineComponent({
    setup() {
        const courseVisible = ref(false);
        const addCourseVisible = ref(false);

        const showModal = (name) => {
            name == "courseVisible"
                ? (courseVisible.value = true)
                : (addCourseVisible.value = true);
        };

        const handleOk = (name) => {
            name == "courseVisible"
                ? (courseVisible.value = false)
                : (addCourseVisible.value = false);
        };

        return {
            courseVisible,
            addCourseVisible,
            showModal,
            handleOk,
        };
    },
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
.my-header {
    background-color: #fff !important;
    margin-bottom: 10px !important;
    height: 44px !important;
    line-height: 44px !important;
}
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