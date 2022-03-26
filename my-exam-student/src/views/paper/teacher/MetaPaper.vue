<template>
    <a-layout style="min-height: 100vh">
        <a-layout>
            <a-layout-header class="my-header">
                <a-row type="flex" align="right" :gutter="20">
                    <a-col>
                        <PlusCircleTwoTone two-tone-color="#1890ff" />
                        <a-typography-link @click="showModal">
                            新建试卷
                        </a-typography-link>
                        <a-modal v-model:visible="createMetaPaperVisible" @ok="createMetaPaper()">
                            <div>
                                <a-typography-title :level="5">
                                    试卷名称
                                </a-typography-title>
                                <a-input v-model:value="metaPaperObj.paperName" />
                            </div>
                        </a-modal>
                    </a-col>
                </a-row>
            </a-layout-header>

            <a-layout-content style="padding:0 25px">
                <a-empty description="暂无待做试卷" style="top:50%;left:50%;position: absolute;" v-if="metaPapers.length==0" />
                <a-row type="flex" :gutter="20">
                    <a-col v-for="paper,key in metaPapers" :key="key">
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
                            <!-- <a-row type="flex" justify="center" align="middle" class="my-bottom">
                                    <a-col>
                                        <a-typography-text type="secondary">限时：{{paper.totalTime/60}}分</a-typography-text>
                                    </a-col>
                                </a-row> -->
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
                                <router-link :to="'/metaPaperDetail/'+paper.id">

                                    <a-tooltip>
                                        <template #title>编辑</template>
                                        <EditOutlined />
                                    </a-tooltip>
                                </router-link>

                                <a-tooltip @click="showPublishModal(paper)">
                                    <template #title>发布</template>
                                    <SendOutlined />
                                </a-tooltip>

                                <a-tooltip @click="deleteMetaPaper(paper.id)">
                                    <template #title>
                                        删除
                                    </template>
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
                    </a-col>
                </a-row>

                <a-modal :visible="publishModalVisible" title="发布试卷" okText="确认" cancelText="取消" @ok="publishPaper()">
                    <a-form :model="paperInfo" class="login-form" @submit="submit">
                        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" label="发送班级" name="schoolClass">
                            <a-select v-model:value="publishInfo.roomIds" mode="multiple" style="width: 100%" placeholder="选择发送班级" :options="publishSchoolClass"></a-select>
                        </a-form-item>
                        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" label="发布名称" name="examName">
                            <a-input v-model:value="publishInfo.publishName"></a-input>
                        </a-form-item>
                        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" label="考试时长" name="totalTime">
                            <a-select v-model:value="publishInfo.totalTime" show-search placeholder="输入或选择时长" style="width: 200px" :options="totalTimeOptions"></a-select>
                        </a-form-item>
                        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" label="考试开始时间" name="examName">
                            <a-date-picker v-model:value="publishInfo.allowedStartTime" show-time placeholder="选择开始时间" @change="onChange" @ok="onOk" />
                        </a-form-item>
                        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" label="考试截止时间" name="examName">
                            <a-date-picker v-model:value="publishInfo.deadline" show-time placeholder="选择截止时间" @change="onChange" @ok="onOk" />
                        </a-form-item>
                    </a-form>
                </a-modal>
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
    PlusCircleTwoTone
} from "@ant-design/icons-vue";
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import paperApi from "@/api/paper";
import moment from "moment";
import classroomApi from "@/api/classroom";

export default {
    components: {
        SendOutlined,
        EditOutlined,
        EllipsisOutlined,
        DeleteOutlined,
        PlusCircleTwoTone,
    },
    setup() {
        const { proxy } = getCurrentInstance();
        const createMetaPaperVisible = ref(false);
        const metaPapers = ref([]);
        const teacherId = proxy.$cookies.get("userId");
        const metaPaperObj = reactive({
            teacherId: teacherId,
        });
        const publishInfo = reactive({
            teacherId: teacherId,
            metaPaperId: "",
            undoneNumber: 0,
            publishName:'',
            roomIds:[],
            totalTime:0
        });
        const publishModalVisible = ref(false);
        const totalTimeOptions = ref([
            {
                value: 30,
                label: 30,
            },
            {
                value: 60,
                label: 60,
            },
            {
                value: 90,
                label: 90,
            },
        ]);

        const publishSchoolClass = ref([]);

        const showModal = () => {
            createMetaPaperVisible.value = true;
        };

        const showPublishModal = (paper) => {
            publishInfo.metaPaperId = paper.id;
            publishInfo.undoneNumber = paper.questionNumber;
            publishInfo.publishName = paper.paperName;
            publishModalVisible.value = true;
            fetchSchoolClass();
        };

        const publishPaper = () => {
            publishInfo.totalTime *= 60;
            paperApi
                .publishPaper(publishInfo)
                .then((result) => {
                    if (result.code == 200) {
                        proxy.$message.success("发布成功");
                        publishModalVisible.value = false;
                    } else {
                        proxy.$message.error("出错了" + result.msg);
                    }
                })
                .catch((reason) => {
                    proxy.$message.error("出错了" + reason);
                });
        };

        const createMetaPaper = () => {
            paperApi
                .createMetaPaper(metaPaperObj)
                .then((result) => {
                    if (result.code == 200) {
                        NowMetaPaper();
                        proxy.$message.success("创建成功");
                        createMetaPaperVisible.value = false;
                    } else {
                        proxy.$message.error("出错了" + result.msg);
                    }
                })
                .catch((reason) => {
                    proxy.$message.error("出错了" + reason);
                });
        };
        const NowMetaPaper = () => {
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
        };
        const deleteMetaPaper = (paperId) => {
            let params = {
                paperId: paperId,
            };
            paperApi
                .deleteMetaPaper(params)
                .then((result) => {
                    if (result.code == 200) {
                        NowMetaPaper();
                        proxy.$message.success("删除成功");
                    } else {
                        proxy.$message.error("出错了" + result.msg);
                    }
                })
                .catch((reason) => {
                    proxy.$message.error("出错了" + reason);
                });
        };

        onMounted(() => {
            NowMetaPaper();
        });
        const dataFormat = (time) =>
            time == undefined ? "" : moment(time).format("YYYY-MM-DD HH:mm");

        const handleChange = () => {
           
            // fetchSchoolClass();
        };

        const fetchSchoolClass = () => {
            let params = {
                teacherId: teacherId,
            };
            classroomApi
                .listTeacherRoom(params)
                .then((result) => {
                    let rooms = result.data;
                    const arr = [];
                    for(let room of rooms) {
                        arr.push({
                            value:room.id,
                            label:room.course+"-"+room.schoolClass
                        })
                    }
                    publishSchoolClass.value = arr;
                })
                .catch((reason) => {
                    proxy.$message.error("出错了:" + reason);
                });
        }

        return {
            metaPapers,
            teacherId,
            createMetaPaperVisible,
            metaPaperObj,
            publishInfo,
            publishModalVisible,
            totalTimeOptions,
            publishSchoolClass,

            handleChange,
            dataFormat,
            createMetaPaper,
            NowMetaPaper,
            showModal,
            deleteMetaPaper,
            publishPaper,
            showPublishModal,

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