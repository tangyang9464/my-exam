<template>
    <a-layout style="min-height: 100vh">
        <a-layout>
            <div class="my-detail-header">
                <a-row type="flex" :gutter="[20,10]" v-if="roomAllData.roomData != undefined">
                    <a-col :span="24" style="margin-top: 10px">
                        <a-typography-title :level="3">{{roomAllData.roomData.course}}</a-typography-title>
                    </a-col>

                    <a-col>
                        <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" :size="25"/>
                        <span style="vertical-align: middle">{{roomAllData.roomData.teacherName}}</span>
                    </a-col>
                    <a-col>
                        <HomeFilled style="vertical-align: middle"/>
                        <span style="vertical-align: middle">{{roomAllData.roomData.class}}班</span>
                    </a-col>
                </a-row>

                <a-row>
                    <a-tabs>
                        <a-tab-pane key="1" tab="试卷">
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="">
                        </a-tab-pane>
                    </a-tabs>
                </a-row>
            </div>

            <a-layout-content style="padding:0 25px">
                <a-row type="flex" :gutter="[20,20]">
                    <a-col v-for="paper in roomAllData.papers" :key="paper.paperId">
                        <a-card hoverable style="width: 300px;">
                            <div class="my-text-center">
                                <a-typography-title :level="4">{{paper.paperName}}</a-typography-title>
                            </div>

                            <div class="my-text-center">
                                <a-typography-text type="secondary">满分：</a-typography-text>
                                <a-typography-text type="secondary">{{paper.totalScore}}分</a-typography-text>
                            </div>

                            <div class="my-text-center">
                                <a-typography-text type="secondary">共{{paper.questionNumber}}题</a-typography-text>
                            </div>

                            <div class="my-text-center">
                                <a-typography-text type="secondary">限时：{{paper.totalTime}}分</a-typography-text>
                            </div>

                            <div class="my-text-center">
                                <a-typography-text type="secondary">截止时间：{{paper.deadLine}}</a-typography-text>
                            </div>

                            <div class="my-text-center" >
                                <a-typography-text type="secondary">得分：</a-typography-text>
                                <a-typography-text v-if="paper.finishStatus!=2">暂无</a-typography-text>
                                <a-typography-text type="success" style="font-size:19px;" v-else>{{paper.obtainScore}}</a-typography-text>
                            </div>

                            <div class="my-text-center">
                                <a-button type="primary" v-if="paper.finishStatus==0">开始答题</a-button>
                                <a-button type="primary" v-if="paper.finishStatus==1">继续答题</a-button>
                                <a-button type="primary" disabled v-if="paper.finishStatus==2">已提交</a-button>
                            </div>
                        </a-card>
                    </a-col>
                </a-row>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import { HomeFilled } from "@ant-design/icons-vue";
import classroomApi from "@/api/classroom";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
export default {
    components: {
        HomeFilled,
    },
    data() {
        return {
            roomAllData: {},
        };
    },
    mounted() {
        const route = useRoute();
        classroomApi
            .detail(route.params.roomCode)
            .then((result) => {
                this.roomAllData = result.data;
                console.log(result.data);
            })
            .catch((reason) => {
                message.error("出错了" + reason);
            });
    },
};
</script>

<style>
.my-detail-header{
    height:134px !important;
    background-color: #fff !important;
    margin-bottom: 10px !important;
    padding: 0 25px;
}
</style> 