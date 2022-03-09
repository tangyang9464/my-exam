<template>
    <a-layout style="min-height: 100vh">
        <a-layout-header class="my-header">
            <a-typography-text strong="true">{{questionData.paperName}}</a-typography-text>
        </a-layout-header>

        <a-statistic-countdown v-if="this.questionData.finishStatus!=2" title="剩余时间" :value="deadline" class="my-countdown" @finish="onFinish" />

        <a-layout-content style="padding:0 25px">
            <div v-for="question,key in questionData.questions" :key="key">
                <a-card>
                    <a-row :gutter="10">
                        <a-col>
                            <div>{{key}}.</div>
                        </a-col>
                        <a-col style="max-width: 800px;">
                            <div>{{question.stem}}
                            </div>
                            <!-- 单选 -->
                            <a-radio-group v-model:value="studentAnswers[key]" v-if="question.questionType == 0">
                                <a-radio :disabled="disabled" class="radioStyle" :value="key" v-for="option,key in question.options" :key="key">
                                    {{String.fromCharCode('A'.charCodeAt(0) + key)}}. {{option}}
                                </a-radio>
                            </a-radio-group>
                            <!-- 多选 -->
                            <div v-if="question.questionType == 1">
                                <a-checkbox-group v-model:value="studentAnswers[key]">
                                    <a-checkbox :disabled="disabled" :value="key" class="radioStyle" v-for="option,key in question.options" :key="key">
                                        {{String.fromCharCode('A'.charCodeAt(0) + key)}}. {{option}}
                                    </a-checkbox>
                                </a-checkbox-group>
                            </div>

                            <!-- 判断题 -->
                            <a-radio-group v-model:value="studentAnswers[key]" v-if="question.questionType == 2">
                                <a-radio :disabled="disabled" class="radioStyle" :value="T">T</a-radio>
                                <a-radio class="radioStyle" :value="F">F</a-radio>
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
                            <a-typography-text type="success" > 答案正确</a-typography-text>
                        </a-col>
                        <a-col v-else>
                            <a-typography-text type="danger" > 答案错误</a-typography-text>
                        </a-col>
                        <a-col v-if="correctStatus[key]!=1">
                            <a-typography-text type="success" >正确答案：{{digitToLetter(question.correctAnswer)}}</a-typography-text>
                        </a-col>
                    </a-row>

                </a-card>
            </div>
        </a-layout-content>
        <a-affix :offset-bottom="10" v-if="this.questionData.finishStatus!=2">
            <a-button type="primary" style="left: 50%" @click="submit">提交</a-button>
        </a-affix>
    </a-layout>

</template>

<script>
import paperApi from "@/api/paper";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import cookies from 'vue-cookies'
export default {
    data() {
        return {
            deadline: '',
            questionData: {},
            studentAnswers:[],
            paperId:'',
            disabled:false,
            correctStatus:[],
            studentId:'',
        };
    },
    components: {
    },
    methods: {
        digitToLetter(answer){
            if(Array.isArray(answer)){
                return answer.map(a => String.fromCharCode(a+65));
            }else{
                return String.fromCharCode(answer+65);
            }
        },
        submit() {
            let params = {
                studentId:this.studentId,
                paperId: this.paperId,
                answers:this.studentAnswers
            };
            paperApi
                .submit(params)
                .then((result) => {
                    this.questionData = result.data;
                    location.reload();
                })
                .catch((reason) => {
                    message.error("出错了" + reason);
                });
        },
    },
    mounted() {
        this.studentId = cookies.get("userId");
        const route = useRoute();
        this.paperId = route.params.paperId;
        let params = {
            paperId: this.paperId,
        };
        paperApi
            .detail(params)
            .then((result) => {
                this.questionData = result.data;
                if(this.questionData.finishStatus != 0){
                    this.studentAnswers = this.questionData.studentAnswers.map(a => a.studentAnswer);
                    this.correctStatus = this.questionData.studentAnswers.map(a => a.correctStatus);
                }
                this.disabled = this.questionData.finishStatus==2;
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