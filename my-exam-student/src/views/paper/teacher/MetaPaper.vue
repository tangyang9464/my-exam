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
                <a-empty description="暂无待做试卷" style="top:50%;left:50%;position: absolute;" v-if="metaPapers.length==0"/>
                <a-row type="flex" :gutter="20">
                    <a-col v-for="paper,key in metaPapers" :key="key">
                        <router-link to="metaPaperDetail">
                            <a-card hoverable style="width: 300px;margin-bottom: 50px;">

                                <a-row type="flex" justify="center" align="middle">
                                    <a-col>
                                        <a-typography-title :level="4">{{paper.paperName}}</a-typography-title>
                                    </a-col>
                                </a-row>

                                <a-row type="flex" justify="center" align="middle" class="my-bottom">
                                    <a-col>
                                        <a-typography-text type="secondary">满分：</a-typography-text>
                                    </a-col>
                                    <a-col>
                                        <a-typography-text type="secondary">{{paper.totalScore}}分</a-typography-text>
                                    </a-col>
                                </a-row>
                                <a-row type="flex" justify="center" align="middle" class="my-bottom">
                                    <a-col>
                                        <a-typography-text type="secondary">共{{paper.questionNumber}}题</a-typography-text>
                                    </a-col>
                                </a-row>
                                <a-row type="flex" justify="center" align="middle" class="my-bottom">
                                    <a-col>
                                        <a-typography-text type="secondary">限时：{{paper.totalTime/60}}分</a-typography-text>
                                    </a-col>
                                </a-row>
                                <a-row type="flex" justify="center" align="middle" class="my-bottom">
                                    <a-col>
                                        <a-typography-text type="secondary">创建时间：{{dataFormat(paper.createTime)}}</a-typography-text>
                                    </a-col>
                                </a-row>
                                <a-row type="flex" justify="center" align="middle" class="my-bottom">
                                    <a-col>
                                        <a-typography-text type="secondary">修改时间：{{dataFormat(paper.updateTime)}}</a-typography-text>
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
                                            <template #title></template>
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
import {getCurrentInstance, onMounted, ref } from "vue";
import paperApi from "@/api/paper";
import moment from 'moment'

export default {
    components: {
        SendOutlined,
        EditOutlined,
        EllipsisOutlined,
        DeleteOutlined,
        PlusSquareOutlined,
    },
    setup() {
        const {proxy} = getCurrentInstance();
        // const collapsed = ref(false);
        // const selectedKeys = ref(["1"]);
        const metaPapers = ref([]);
        const teacherId = proxy.$cookies.get("userId");

        onMounted(() => {
            let params = {
                teacherId: teacherId,
            };
            paperApi
                .metaPapers(params)
                .then((result) => {
                    metaPapers.value = result.data;
                })
                .catch((reason) => {
                    proxy.$message.error("出错了" + reason);
                });
        });
        const dataFormat = (time) => time==undefined ? "" : moment(time).format('YYYY-MM-DD HH:mm');
        return {
            // collapsed,
            // selectedKeys,
            metaPapers,
            teacherId,

            dataFormat
        };
    },
};
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