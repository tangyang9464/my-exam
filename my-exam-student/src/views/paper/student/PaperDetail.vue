<template>
    <a-layout style="min-height: 100vh">
        <a-layout-header class="my-header">
            <a-typography-text strong="true">{{questionData.paperName}}</a-typography-text>
        </a-layout-header>

        <a-statistic-countdown v-if="this.questionData.finishStatus!=2" title="剩余时间" :value="deadline" class="my-countdown" @finish="submit" />
        <a-layout-content style="padding:0 25px">
            <div v-for="question,key in questionData.questions" :key="key">
                <a-card v-if="questionData.finishStatus==2">
                    <a-row :gutter="10">
                        <a-col>
                            <div>{{key}}.</div>
                        </a-col>
                        <a-col style="max-width: 800px;">
                            <div v-html="question.stem">
                            </div>
                            <!-- 单选选择题 -->
                            <a-radio-group v-if="question.questionType == 0">
                                <div v-for="option,key2 in question.options" :key="key2" class="radioStyle">
                                    <span class="ant-radio" :class="{'ant-radio-checked':key2==studentAnswers[key2]}">
                                        <span class="ant-radio-inner"></span>
                                    </span>
                                    <span>
                                        {{String.fromCharCode('A'.charCodeAt(0) + key2)}}.
                                        <div style="display:inline-block" v-html="option"></div>
                                    </span>
                                </div>
                            </a-radio-group>
                            <!-- 多选 -->
                            <a-checkbox-group v-if="question.questionType == 1">
                                <div v-for="option,key2 in question.options" :key="key2" class="radioStyle">
                                    <span class="ant-checkbox" :class="{'ant-checkbox-checked':isExist(studentAnswers[key2],key2)}">
                                        <span class="ant-checkbox-inner"></span>
                                    </span>
                                    <span>
                                        {{String.fromCharCode('A'.charCodeAt(0) + key2)}}.
                                        <div style="display:inline-block" v-html="option"></div>
                                    </span>
                                </div>
                            </a-checkbox-group>
                            <!-- 判断题 -->
                            <a-radio-group v-model:value="value" v-if="question.questionType==2">
                                <div class="radioStyle">
                                    <span class="ant-radio" :class="{'ant-radio-checked':studentAnswers[key]=='T'}">
                                        <span class="ant-radio-inner"></span>
                                    </span>
                                    <span>
                                        T
                                    </span>
                                </div>

                                <div class="radioStyle">
                                    <span class="ant-radio" :class="{'ant-radio-checked':'F'==studentAnswers[key]}">
                                        <span class="ant-radio-inner"></span>
                                    </span>
                                    <span>
                                        F
                                    </span>
                                </div>
                            </a-radio-group>
                        </a-col>
                        <a-col>
                            <div>
                                ({{question.score}}分)
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="10" style="margin-top:20px" v-if="correctStatus[key]!=undefined">
                            <a-col>
                                <div>{{key}}.</div>
                            </a-col>
                            <a-col v-if="correctStatus[key]==1">
                                <a-typography-text type="success"> 答案正确</a-typography-text>
                            </a-col>
                            <a-col v-else>
                                <a-typography-text type="danger"> 答案错误</a-typography-text>
                            </a-col>
                            <a-col v-if="correctStatus[key]!=1">
                                <a-typography-text type="success">正确答案：{{digitToLetter(question.correctAnswer)}}</a-typography-text>
                            </a-col>
                        </a-row>
                </a-card>
                <a-card v-else>
                    <a-row :gutter="10">
                        <a-col>
                            <div>{{key}}.</div>
                        </a-col>
                        <a-col style="max-width: 800px;">
                            <div v-html="question.stem">
                            </div>
                            <!-- 单选 -->
                            <a-radio-group v-model:value="studentAnswers[key]" v-if="question.questionType == 0">
                                <a-radio :disabled="disabled" class="radioStyle" :value="key" v-for="option,key in question.options" :key="key">
                                    <span>
                                        {{String.fromCharCode('A'.charCodeAt(0) + key)}}.
                                        <div style="display:inline-block" v-html="option"></div>
                                    </span>
                                </a-radio>
                            </a-radio-group>
                            <!-- 多选 -->
                            <div v-if="question.questionType == 1">
                                <a-checkbox-group v-model:value="studentAnswers[key]">
                                    <a-checkbox :disabled="disabled" :value="key" class="radioStyle" v-for="option,key in question.options" :key="key">
                                        <span>
                                            {{String.fromCharCode('A'.charCodeAt(0) + key)}}.
                                            <div style="display:inline-block" v-html="option"></div>
                                        </span>
                                    </a-checkbox>
                                </a-checkbox-group>
                            </div>
                            <!-- 判断题 -->
                            <a-radio-group v-model:value="studentAnswers[key]" v-if="question.questionType == 2">
                                <a-radio :disabled="disabled" class="radioStyle" value="T">T</a-radio>
                                <a-radio class="radioStyle" value="F">F</a-radio>
                            </a-radio-group>
                        </a-col>
                        <a-col>
                            <div>
                                ({{question.score}}分)
                            </div>
                        </a-col>
                    </a-row>

                </a-card>

            </div>
        </a-layout-content>
        <a-affix :offset-bottom="10" v-if="this.questionData.finishStatus!=2">
            <a-button type="primary" style="left: 50%" @click="submit">提交</a-button>
        </a-affix>
        <a-affix :offset-bottom="10" v-else>
            <a-button type="primary" style="left: 50%" @click="router.back(-1)">退出</a-button>
        </a-affix>
    </a-layout>

</template>

<script>
import paperApi from "@/api/paper";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
import cookies from "vue-cookies";
import moment from "moment";

export default {
    data() {
        return {
            questionData: {},
            paperId: "",
            disabled: false,
            studentAnswers:[],
            correctStatus: [],
            studentId: "",
            deadline: 0,
        };
    },
    components: {},
    methods: {
        digitToLetter(answer) {
            if (Array.isArray(answer)) {
                return answer.map((a) => String.fromCharCode(a + 65));
            } else if(answer!='T' && answer!='F'){
                return String.fromCharCode(answer + 65);
            } else{
                return answer;
            }
        },
        submit() {
            let params = {
                studentPaperId: this.paperId,
                metaPaperId: this.questionData.metaPaperId,
                teacherPaperId: this.questionData.teacherPaperId,
                answers: this.studentAnswers,
            };
            paperApi
                .submit(params)
                .then((result) => {
                    this.questionData = result.data;
                    this.router.back(-1);
                    message.success("提交成功");
                })
                .catch((reason) => {
                    message.error("出错了" + reason);
                });
        },
        tempSave(){
            let params = {
                studentPaperId: this.paperId,
                metaPaperId: this.questionData.metaPaperId,
                teacherPaperId: this.questionData.teacherPaperId,
                answers: this.studentAnswers,
            };
            paperApi
                .tempSave(params)
                .then((result) => {
                    this.questionData = result.data;
                })
                .catch((reason) => {
                    message.error("出错了" + reason);
                });
        },
        isExist(arr,target){
            for(let i=0;i<arr.length;i++){
                let num = arr[i];
                if(target==num){
                    return true;
                }
            }
            return false;
        }
    },
    beforeUnmount() {
        this.tempSave();
    },
    mounted() {
        this.studentId = cookies.get("userId");
        const route = useRoute();
        this.router = useRouter();
        this.paperId = route.params.paperId;
        var vue = this;
        window.onbeforeunload = () => {
            vue.tempSave();
        };
        let params = {
            paperId: this.paperId,
        };
        paperApi
            .detail(params)
            .then((result) => {
                this.questionData = result.data;
                if (
                    this.questionData.studentAnswers == null ||
                    this.questionData.studentAnswers == undefined
                ) {
                    this.questionData.studentAnswers = [];
                }
                this.studentAnswers = this.questionData.studentAnswers.map(
                    (a) => a.studentAnswer
                );
                this.correctStatus = this.questionData.studentAnswers.map(
                    (a) => a.correctStatus
                );
                let now = Date.now();
                let passTime =
                    (now -
                        moment(this.questionData.actualStartTime).valueOf()) /
                    1000;
                console.log(passTime);
                this.deadline =
                    (this.questionData.totalTime - passTime) * 1000 +
                    Date.now();
                console.log(this.deadline);
                this.disabled = this.questionData.finishStatus == 2;
            })
            .catch((reason) => {
                message.error("出错了" + reason);
            });
    },
};
</script>

<style>
.my-countdown {
    position: absolute;
    top: 80px;
    right: 50px;
    z-index: 1000;
}
.radioStyle {
    display: block !important;
    margin-top: 20px !important;
}
.ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0px !important;
}
</style>