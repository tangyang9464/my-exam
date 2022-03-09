<template>
    <a-card>
        <a-row :gutter="10">
            <a-col>
                <div>{{num}}.</div>
            </a-col>
            <a-col style="max-width: 800px;">
                <div>{{question.stem}}
                </div>
                <!-- 单选 -->
                <a-radio-group v-model:value="singleAnswer" v-if="question.questionType == 'singleChoice'">
                    <a-radio class="radioStyle" :value="key" v-for="option,key in JSON.parse(question.options).options" :key="key">
                        {{option}}
                    </a-radio>
                </a-radio-group>
                <!-- 多选 -->
                <div v-if="question.questionType == 'multipleChoice'">
                    <a-checkbox-group v-model:value="multipleAnswer">
                        <a-checkbox :value="key" class="radioStyle"  v-for="option,key in JSON.parse(question.options).options" :key="key">
                            {{option}}
                        </a-checkbox>
                    </a-checkbox-group>
                </div>

                <!-- 判断题 -->
                <a-radio-group v-model:value="value" v-if="question.questionType == 'judge'">
                    <a-radio class="radioStyle" :value="T">T</a-radio>
                    <a-radio class="radioStyle" :value="F">F</a-radio>
                </a-radio-group>
            </a-col>
            <a-col>
                <div>
                    ({{question.score}}分)
                </div>
            </a-col>
        </a-row>
    </a-card>
</template>

<script>
export default {
    props: ["question", "num"],
    data() {
        return {
            singleAnswer:'',
            multipleAnswer:[],
        };
    },
    components: {},
    methods: {},
    mounted() {},
};
</script>

<style>
.radioStyle {
    display: block !important;
    margin-top: 20px !important;
}
.ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0px !important;
}
</style>