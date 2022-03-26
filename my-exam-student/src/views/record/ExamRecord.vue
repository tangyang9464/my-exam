<template>
    <a-layout style="min-height: 100vh">
        <a-layout>
            <a-layout-header class="my-header" />
            <a-layout-content style="padding:0 25px">
                <a-empty description="暂无考试记录" style="top:50%;left:50%;position: absolute;" v-if="recordData.length==0"/>
                <a-row type="flex" align="middle" :gutter="20">
                    <a-col v-for="record,key in recordData" :key="key">
                        <router-link :to="'/paperDetail/' + record.id">
                            <a-card hoverable style="width: 300px;margin-bottom: 50px;">
                                <a-typography-title :level="4">{{record.paperName}}</a-typography-title>
                                <a-row type="flex" :gutter="[0,10]" align="middle" class="my-bottom">
                                    <a-col :span="12">
                                        <a-typography-text type="secondary">题目数量：</a-typography-text>
                                        <a-typography-text type="secondary">{{record.questionNumber}}</a-typography-text>
                                    </a-col>
                                    <a-col :span="12">
                                        <a-typography-text type="secondary">正确数量：</a-typography-text>
                                        <a-typography-text type="secondary">{{record.correctNumber}}</a-typography-text>
                                    </a-col>

                                    <a-col :span="12">
                                        <a-typography-text type="secondary">试卷总分：</a-typography-text>
                                        <a-typography-text type="secondary">{{record.totalScore}}分</a-typography-text>
                                    </a-col>
                                    <a-col :span="12">
                                        <a-typography-text type="secondary">最终得分：</a-typography-text>
                                        <a-typography-text type="secondary">{{record.obtainScore}}分</a-typography-text>
                                    </a-col>

                                    <a-col :span="24">
                                        <a-typography-text type="secondary">提交时间：</a-typography-text>
                                        <a-typography-text type="secondary">{{dataFormat(record.submitTime)}}</a-typography-text>
                                    </a-col>

                                    <a-col :span="24">
                                        <a-typography-text type="secondary">截止时间：</a-typography-text>
                                        <a-typography-text type="secondary">{{dataFormat(record.deadline)}}</a-typography-text>
                                    </a-col>

                                    <a-col>
                                        <a-typography-text type="secondary">纸卷状态：</a-typography-text>
                                    </a-col>
                                    <a-col>
                                        <a-alert message="未批改" type="success" v-if="finishStatus==1" />
                                        <a-alert message="已批改" type="success" v-else />
                                    </a-col>
                                </a-row>
                            </a-card>
                        </router-link>
                    </a-col>

                </a-row>

            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
import recordApi from "@/api/record";
import { message } from "ant-design-vue";
import moment from 'moment'
import cookies from 'vue-cookies'

export default {
    components: {},

    data() {
        return {
            selectedKeys: "1",
            studentId: "",
            recordData: [],
        };
    },
    methods: {
        dataFormat(time){
            return moment(time).format('YYYY-MM-DD HH:mm');
        },
        getRecords() {
            let params = {
                studentId: this.studentId,
            };
            recordApi
                .list(params)
                .then((result) => {
                    this.recordData = result.data;
                    console.log(this.recordData);
                })
                .catch((reason) => {
                    message.error("出错了" + reason);
                });
        },
    },
    mounted() {
        this.studentId = cookies.get("userId");
        this.getRecords();
    },
};
</script>
<style>
.my-header {
    background-color: #fff !important;
    margin-bottom: 10px !important;
    height: 44px !important;
    line-height: 44px !important;
}
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