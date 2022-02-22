<template>
    <a-layout style="min-height: 100vh">
        <a-layout>
            <a-layout-header class="my-header">
                <a-row type="flex" align="right" :gutter="20">
                    <a-col>
                        <PlusSquareOutlined />
                        <a-typography-text type="primary">
                            新建试卷
                        </a-typography-text>
                    </a-col>
                </a-row>
            </a-layout-header>

            <a-layout-content style="padding:0 25px">
                <a-row type="flex" justify="space-around" align="middle">
                    <a-col>
                        <router-link to="paperDetail">
                            <a-card hoverable style="width: 300px;margin-bottom: 50px;">

                                <a-row type="flex" justify="center" align="middle">
                                    <a-col>
                                        <a-typography-title :level="4">操作系统</a-typography-title>
                                    </a-col>
                                </a-row>

                                <a-row type="flex" justify="center" align="middle" class="my-bottom">
                                    <a-col>
                                        <a-typography-text type="secondary">满分：</a-typography-text>
                                    </a-col>
                                    <a-col>
                                        <a-typography-text type="secondary">10分</a-typography-text>
                                    </a-col>
                                </a-row>
                                <a-row type="flex" justify="center" align="middle" class="my-bottom">
                                    <a-col>
                                        <a-typography-text type="secondary">共9题</a-typography-text>
                                    </a-col>
                                </a-row>
                                <a-row type="flex" justify="center" align="middle" class="my-bottom">
                                    <a-col>
                                        <a-typography-text type="secondary">限时：10分</a-typography-text>
                                    </a-col>
                                </a-row>
                                <a-row type="flex" justify="center" align="middle" class="my-bottom">
                                    <a-col>
                                        <a-typography-text type="secondary">创建时间：2020-12-26/12:00/周六</a-typography-text>
                                    </a-col>
                                </a-row>
                                <a-row type="flex" justify="center" align="middle" class="my-bottom">
                                    <a-col>
                                        <a-typography-text type="secondary">修改时间：2020-12-26/12:00/周六</a-typography-text>
                                    </a-col>
                                </a-row>

                                <template #actions class="ant-card-actions">
                                    <a-tooltip>
                                        <template #title>编辑</template>
                                        <EditOutlined />
                                    </a-tooltip>

                                    <a-tooltip>
                                        <template #title>发布</template>
                                        <SendOutlined />
                                    </a-tooltip>

                                    <a-tooltip>
                                        <template #title>删除</template>
                                        <DeleteOutlined />
                                    </a-tooltip>

                                    <a-dropdown :trigger="['click']">
                                        <a-tooltip>
                                            <template #title>更多</template>
                                            <EllipsisOutlined />
                                        </a-tooltip>

                                        <template #overlay>
                                            <a-menu>
                                                <a-menu-item>
                                                    <div>重命名</div>
                                                </a-menu-item>
                                            </a-menu>
                                        </template>
                                    </a-dropdown>
                                </template>
                            </a-card>
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
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
import {
    SendOutlined,
    EditOutlined,
    EllipsisOutlined,
    DeleteOutlined,
    PlusSquareOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import Avatar from "@/components/Avatar.vue";
import Card from "@/components/Card.vue";

export default defineComponent({
    components: {
        SendOutlined,
        EditOutlined,
        EllipsisOutlined,
        DeleteOutlined,
        PlusSquareOutlined,
        Avatar,
        Card,
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
    margin-bottom: 5px;
}
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
.ant-card-actions {
    background-color: #ffffff !important;
}

.site-layout .site-layout-background {
    background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
    background: #141414;
}
</style>