<template>
    <a-layout style="min-height: 100vh">
        <a-layout>
            <div class="my-detail-header">
                <a-row type="flex" :gutter="[20,10]" v-if="roomAllData.room != undefined">
                    <a-col :span="24" style="margin-top: 10px">
                        <a-typography-title :level="3">{{roomAllData.room.course}}</a-typography-title>
                    </a-col>

                    <a-col v-if="role==0">
                        <a-avatar :src="'http://localhost:9090/upload/'+roomAllData.room.teacherAvatar" :size="25" />
                        <span style="vertical-align: middle;margin-left:10px">{{roomAllData.room.teacherName}}</span>
                    </a-col>
                    <a-col v-else>
                        <UserOutlined />
                        <a-typography-text style="margin-left:5px">{{roomAllData.room.studentNumber}}</a-typography-text>
                    </a-col>
                    <a-col>
                        <HomeOutlined style="vertical-align: middle" />
                        <span style="vertical-align: middle;margin-left:5px">{{roomAllData.room.schoolClass}}班</span>
                    </a-col>
                </a-row>

                <a-row>
                    <a-tabs>
                        <a-tab-pane key="1" tab="试卷">
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="成员管理" v-if="role==1">
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="" v-if="role==0">
                        </a-tab-pane>
                    </a-tabs>
                </a-row>
            </div>
            <a-layout-content style="padding:0 25px" class="my-scroll">
                <a-empty description="暂无试卷" style="top:50%;left:50%;position: absolute;" v-if="roomAllData.papers==undefined || roomAllData.papers.length==0" />
                <a-row type="flex" :gutter="[20,20]" v-else>
                    <a-col v-for="paper in roomAllData.papers" :key="paper.id">
                        <a-card hoverable style="width: 300px;">
                            <div class="my-text-center">
                                <a-typography-title :level="4">{{paper.publishName}}</a-typography-title>
                            </div>

                            <div class="my-text-center">
                                <a-typography-text type="secondary">满分：</a-typography-text>
                                <a-typography-text type="secondary">{{paper.totalScore}}分</a-typography-text>
                            </div>

                            <div class="my-text-center">
                                <a-typography-text type="secondary">共{{paper.questionNumber}}题</a-typography-text>
                            </div>

                            <div class="my-text-center" v-if="role==0">
                                <a-typography-text type="secondary">限时：{{paper.totalTime/60}}分钟</a-typography-text>
                            </div>

                            <div class="my-text-center">
                                <a-typography-text type="secondary">截止时间：{{dataFormat(paper.deadline)}}</a-typography-text>
                            </div>

                            <div class="my-text-center" v-if="role==1">
                                <a-typography-text type="secondary">未完成人数：</a-typography-text>
                                <a-typography-text type="danger" style="font-size:19px;">{{paper.undoneNumber}}</a-typography-text>
                            </div>

                            <div class="my-text-center" v-if="role==1">
                                <a-typography-text type="secondary">已完成人数：</a-typography-text>
                                <a-typography-text type="success" style="font-size:19px;">{{paper.doneNumber}}</a-typography-text>
                            </div>

                            <div class="my-text-center" v-if="role==0 && paper.finishStatus==2">
                                <a-typography-text type="secondary">提交时间：{{dataFormat(paper.submitTime)}}</a-typography-text>
                            </div>

                            <div class="my-text-center" v-if="role==0">
                                <a-typography-text type="secondary">得分：</a-typography-text>
                                <a-typography-text v-if="paper.finishStatus!=2">暂无</a-typography-text>
                                <a-typography-text type="success" style="font-size:19px;" v-else>{{paper.obtainScore}}</a-typography-text>
                            </div>

                            <div class="my-text-center" v-if="role==0">
                                <a-button type="primary" @click="startAnswering(paper)" v-if="paper.finishStatus==0">开始答题</a-button>
                                <router-link :to="'/paperDetail/' + paper.id">
                                    <a-button type="primary" v-if="paper.finishStatus==1">继续答题</a-button>
                                    <a-button type="primary" ghost v-if="paper.finishStatus==2">查看试卷</a-button>
                                </router-link>
                            </div>
                            <div class="my-text-center" v-if="role==1">
                                <a-button v-if="role==0" @click="router.push('/paperDetail/' + paper.id)" type="primary" ghost>查看试卷</a-button>
                                <a-button v-else @click="router.push('/summaryPaper/' + paper.id)" type="primary" ghost>查看试卷</a-button>
                            </div>
                        </a-card>
                    </a-col>
                </a-row>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import { HomeOutlined, UserOutlined } from "@ant-design/icons-vue";
import classroomApi from "@/api/classroom";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
import moment from "moment";
import cookies from "vue-cookies";
import paperApi from "@/api/paper";
export default {
    components: {
        HomeOutlined,
        UserOutlined,
    },
    data() {
        return {
            roomAllData: {},
            userId: "",
            role: "",
            router:'',
        };
    },
    mounted() {
        this.userId = cookies.get("userId");
        this.role = cookies.get("userRole");
        this.router = useRouter();
        console.log(this.role);
        const route = useRoute();
        if (this.role == 0) {
            let params = {
                studentId: this.userId,
                roomId: route.params.roomId,
            };
            classroomApi
                .detail(params)
                .then((result) => {
                    this.roomAllData = result.data;
                })
                .catch((reason) => {
                    message.error("出错了" + reason);
                });
        } else {
            let params2 = {
                roomId: route.params.roomId,
            };
            classroomApi
                .teacherDetail(params2)
                .then((result) => {
                    this.roomAllData = result.data;
                })
                .catch((reason) => {
                    message.error("出错了" + reason);
                });
        }
    },
    methods: {
        startAnswering(paper) {
            let params = {
                studentId: this.userId,
                paperId: paper.id,
            };
            paperApi
                .startAnswering(params)
                .then((result) => {
                    if (result.code == 200) {
                        this.router.push("/paperDetail/" + paper.id);
                    }
                })
                .catch((reason) => {
                    message.error("出错了" + reason);
                });
        },
        dataFormat(time) {
            if (time == undefined) {
                return "";
            }
            return moment(time).format("YYYY-MM-DD HH:mm");
        },
    },
};
</script>

<style>
.my-detail-header {
    height: 134px !important;
    background-color: #fff !important;
    margin-bottom: 10px !important;
    padding: 0 25px;
}
.my-scroll {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}
</style> 