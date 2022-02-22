<template>
    <a-layout style="min-height: 100vh">
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0" />
            <a-layout-content>
                <a-row type="flex" justify="space-around" align="middle">
                    <a-col>
                        <a-card hoverable style="width: 300px;margin-bottom: 50px;">
                            <a-typography-title :level="4">操作系统</a-typography-title>
                            <a-row type="flex" :gutter="16" align="middle" class="my-bottom">
                                <a-col>
                                    <a-typography-text type="secondary">题目数量：</a-typography-text>
                                    <a-typography-text type="secondary">6</a-typography-text>
                                </a-col>
                                <a-col >
                                    <a-typography-text type="secondary">正确数量：</a-typography-text>
                                    <a-typography-text type="secondary">6</a-typography-text>
                                </a-col>
                            </a-row>

                            <a-row type="flex" :gutter="16" align="middle" class="my-bottom">
                                <a-col >
                                    <a-typography-text type="secondary">试卷总分：</a-typography-text>
                                    <a-typography-text type="secondary">10分</a-typography-text>
                                </a-col>
                                <a-col >
                                    <a-typography-text type="secondary">最终得分：</a-typography-text>
                                    <a-typography-text type="secondary">10分</a-typography-text>
                                </a-col>
                            </a-row>

                            <a-row type="flex" :gutter="16" align="middle" class="my-bottom">
                                <a-col >
                                    <a-typography-text type="secondary">提交时间：</a-typography-text>
                                    <a-typography-text type="secondary">2020-12-26/12:00/周六</a-typography-text>
                                </a-col>
                            </a-row>
                            
                            <a-row type="flex" :gutter="16" align="middle" class="my-bottom">
                                <a-col >
                                    <a-typography-text type="secondary">截止时间：</a-typography-text>
                                    <a-typography-text type="secondary">2020-12-26/12:00/周六</a-typography-text>
                                </a-col>
                            </a-row>

                            <a-row type="flex" :gutter="16" align="middle" style="margin-top:20px;">
                                <a-col >
                                    <a-typography-text type="secondary">纸卷状态：</a-typography-text>
                                </a-col>
                                <a-col>
                                    <a-alert message="已批改" type="success" />
                                </a-col>
                            </a-row>
                        </a-card>
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
.my-bottom {
    margin-bottom: 10px;
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