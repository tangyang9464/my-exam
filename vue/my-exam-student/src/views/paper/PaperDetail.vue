<template>
    <a-layout style="min-height: 100vh">
        <a-layout-header class="my-header">
            <a-typography-text strong="true">{{questionData.paperName}}</a-typography-text>
        </a-layout-header>

        <a-statistic-countdown title="剩余时间" :value="deadline" class="my-countdown" @finish="onFinish" />

        <a-layout-content style="padding:0 25px">
            <div v-for="question,key in questionData.questions" :key="key">
                <ChoiceType :num="key" :question='question' />
            </div>
        </a-layout-content>
        <a-affix :offset-bottom="10" >
            <a-button type="primary" style="left: 50%" @click="bottom += 10">提交</a-button>
        </a-affix>
    </a-layout>

</template>

<script>
import ChoiceType from "@/views/paper/questions/ChoiceType.vue";
import paperApi from "@/api/paper";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
export default {
    data() {
        return {
            deadline:  Date.now() + 600,
            questionData:{}
        };
    },
    components: {
        ChoiceType,
    },
    methods:{
        
    },
    mounted(){
        const route = useRoute();
        paperApi
            .detail(route.params.paperId)
            .then((result) => {
                this.questionData = result.data;
                this.deadline = Date.now() + this.questionData.totalTime;
                console.log(result.data);
            })
            .catch((reason) => {
                message.error("出错了" + reason);
            });
    }
};
</script>

<style>
.my-countdown {
    position: absolute;
    top: 80px;
    right: 50px;
    z-index: 1000;
}
</style>