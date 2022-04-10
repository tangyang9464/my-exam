<template>
    <a-layout style="min-height: 100vh;">
        <a-layout style="background:#ffffff">
            <a-layout-header class="my-header">
                <a-typography-text style="font-size: 17px">{{teacherPaper.publishName}} </a-typography-text>
            </a-layout-header>

            <a-layout-content style="padding: 0 25px">
                <div class="label_3XKMT" style="font-size:18px">试卷统计</div>
				<a-row type="flex" justify="space-between">
                    <a-col span="12">
                        <a-row type="flex" justify="space-between" style="height:25%">
                            <a-col style="margin:auto 0;">
                                <div class="label_3XKMT">已完成</div>
                            </a-col>
                            <a-col style="margin:auto 0;height:25%">
                                <span class="value_2e-rV">{{ teacherPaper.doneNumber }} 人</span>
                            </a-col>
                        </a-row>

                        <a-row type="flex" justify="space-between" style="height:25%">
                            <a-col style="margin:auto 0;height:25%">
                                <div class="label_3XKMT">未完成</div>
                            </a-col>
                            <a-col style="margin:auto 0;height:25%">
                                <span class="value_2e-rV">{{ teacherPaper.undoneNumber }} 人</span>
                            </a-col>
                        </a-row>

						<a-row type="flex" justify="space-between" style="height:25%">
                            <a-col style="margin:auto 0;">
                                <div class="label_3XKMT">正确率</div>
                            </a-col>
                            <a-col style="margin:auto 0;">
                                <span class="value_2e-rV">{{(teacherPaper.correctQuestionNumber /(totalQuestionNumber * totalStudentNumber)).toFixed(2)*100}}%</span>
                            </a-col>
                        </a-row>

						<a-row type="flex" justify="space-between" style="height:25%">
                            <a-col style="margin:auto 0;">
                                <div class="label_3XKMT">平均得分</div>
                            </a-col>
                            <a-col style="margin:auto 0;">
                                <span class="value_2e-rV">{{ teacherPaper.allScore / totalStudentNumber }}分</span>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col span="11">
                        <div style="height: 50%;text-align:center;width:100%">
							<div class="label_3XKMT">
                                完成率
                            </div>
                            <a-progress type="circle" :percent="(teacherPaper.doneNumber / totalStudentNumber) * 100" />
						</div>
                        <div style="height: 50%;text-align:center;width:100%">
							<div class="label_3XKMT">
                                正确率
                            </div>
                            <a-progress type="circle" :percent="(teacherPaper.correctQuestionNumber /(totalQuestionNumber * totalStudentNumber)).toFixed(2)*100" />
                        </div>
                    </a-col>
                </a-row>

                <a-card style="margin-top: 40px;">
                    <a-row type="flex" justify="space-between">
                        <a-col>
                        </a-col>

                        <a-col>
                            <div class="my-text-center">
                                <a-button type="primary" size="large" ghost @click="showModal()">查看试卷</a-button>
                            </div>
                        </a-col>
						<a-col>
                        </a-col>
                    </a-row>
                </a-card>

                <a-modal :footer="null" okText="确认" cancelText="取消" centered v-model:visible="summaryVisible" width="90%" :maskStyle="{ background: '#4c4c4c' }">
                    <a-card :bodyStyle="{'background-color':'#f0f2f5'}" title="题目详情" :tab-list="questionNumberList" :active-tab-key="curQuestionIndex" @tabChange="(index) => onTabChange(index)">
                        <a-row type="flex" justify="space-around" align="middle">
                            <a-col :span="11">
                                <a-card :bodyStyle="{'height':'407px'}">
                                    <a-row :gutter="10">
                                        <a-col> {{ curQuestionIndex }}. </a-col>
                                        <a-col style="max-width: 800px">
                                            <div v-html="curQuestion.stem"></div>
                                            <!-- 单选选择题 -->
                                            <a-radio-group v-if="curQuestion.questionType == 0">
                                                <div v-for="(option, key2) in curQuestion.options" :key="key2" class="radioStyle">
                                                    <span class="ant-radio" :class="{'ant-radio-checked':key2 == curQuestion.correctAnswer}">
                                                        <span class="ant-radio-inner"></span>
                                                    </span>
                                                    <span>
                                                        {{String.fromCharCode("A".charCodeAt(0) + key2)}}.
                                                        <div style="display: inline-block" v-html="option"></div>
                                                    </span>
                                                </div>
                                            </a-radio-group>
                                            <!-- 多选 -->
                                            <a-checkbox-group v-if="curQuestion.questionType == 1">
                                                <div v-for="(option, key2) in curQuestion.options" :key="key2" class="radioStyle">
                                                    <span class="ant-checkbox" :class="{'ant-checkbox-checked':curQuestion.correctAnswer.includes(key2)}">
                                                        <span class="ant-checkbox-inner"></span>
                                                    </span>
                                                    <span>
                                                        {{String.fromCharCode("A".charCodeAt(0)) + key2}}.
                                                        <div style="display: inline-block" v-html="option"></div>
                                                    </span>
                                                </div>
                                            </a-checkbox-group>
                                            <!-- 判断题 -->
                                            <a-radio-group v-model:value="value" v-if="curQuestion.questionType == 2">
                                                <div class="radioStyle">
                                                    <span class="ant-radio" :class="{'ant-radio-checked':'T' == curQuestion.correctAnswer}">
                                                        <span class="ant-radio-inner"></span>
                                                    </span>
                                                    <span> T </span>
                                                </div>

                                                <div class="radioStyle">
                                                    <span class="ant-radio" :class="{'ant-radio-checked':'F' == curQuestion.correctAnswer}">
                                                        <span class="ant-radio-inner"></span>
                                                    </span>
                                                    <span> F </span>
                                                </div>
                                            </a-radio-group>
                                        </a-col>
                                        <a-col>
                                            <div>({{ curQuestion.score }}分)</div>
                                        </a-col>
                                    </a-row>
                                </a-card>
                            </a-col>

                            <a-col :span="11">
                                <a-card title="答题统计">
                                    <v-chart class="chart" :option="option" />
                                </a-card>
                            </a-col>
                        </a-row>
                    </a-card>
                </a-modal>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
import { getCurrentInstance, onMounted, reactive, ref, toRaw } from 'vue';
import { useRoute } from 'vue-router';
import paperApi from '@/api/paper';
// vue-echarts
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import VChart from 'vue-echarts';

use([CanvasRenderer, GridComponent, BarChart, TooltipComponent, LegendComponent]);

export default {
	components: {
		VChart
	},
	setup() {
		const { proxy } = getCurrentInstance();
		const route = useRoute();
		const summaryVisible = ref(false);
		let teacherPaper = ref({});
		let totalStudentNumber = ref(1);
		let totalQuestionNumber = ref(1);
		let curQuestionOptionIndex = reactive([]);
		let curStudentOptionDistribution = reactive([]);
		const option = ref({
			tooltip: {
				show: true
			},
			legend: {
				data: ['人数']
			},
			xAxis: [
				{
					type: 'category',
					data: curQuestionOptionIndex
				}
			],
			yAxis: [
				{
					type: 'value',
					show: false
				}
			],
			series: [
				{
					name: '人数',
					type: 'bar',
					data: curStudentOptionDistribution,
					label: {
						show: true, //开启显示
						position: 'top', //在上方显示
						//数值样式
						color: 'black',
						fontSize: 16
					}
				}
			]
		});

		const questionNumberList = reactive([]);
		const curQuestionIndex = ref(0);
		const curQuestion = ref({});

		const getTeacherPaper = () => {
			let params = {
				teacherPaperId: route.params.paperId
			};
			paperApi
				.getTeacherPaper(params)
				.then(result => {
					teacherPaper.value = result.data;
					totalStudentNumber.value = result.data.doneNumber + result.data.undoneNumber;
					totalQuestionNumber.value = result.data.questions.length;
					for (let i = 0; i < totalQuestionNumber.value; i++) {
						questionNumberList.push({ key: i, tab: i + 1 });
					}
					if (totalQuestionNumber.value > 0) {
						curQuestion.value = teacherPaper.value.questions[0];
						if (curQuestion.value.questionType != 2) {
							for (let i = 0; i < curQuestion.value.options.length; i++) {
								curQuestionOptionIndex.push(String.fromCharCode('A'.charCodeAt(0) + i));
							}
						} else {
							curQuestionOptionIndex.push('T');
							curQuestionOptionIndex.push('F');
						}
						if (
							teacherPaper.value.studentOptionDistribution != undefined ||
							teacherPaper.value.studentOptionDistribution != null
						) {
							let arr = toRaw(teacherPaper.value.studentOptionDistribution[curQuestionIndex.value]);
							for (let i = 0; i < arr.length; i++) {
								curStudentOptionDistribution[i] = arr[i];
							}
						} else {
							curStudentOptionDistribution = [];
						}
					}
				})
				.catch(reason => {
					proxy.$message.error('出错了' + reason);
				});
		};

		const onTabChange = curQuestionIndexValue => {
			curQuestionIndex.value = curQuestionIndexValue;
			curQuestion.value = teacherPaper.value.questions[curQuestionIndexValue];

			let arr = toRaw(teacherPaper.value.studentOptionDistribution[curQuestionIndex.value]);
			for (let i = 0; i < arr.length; i++) {
				curStudentOptionDistribution[i] = arr[i];
			}

			curQuestionOptionIndex.length = 0;
			if (curQuestion.value.questionType != 2) {
				for (let i = 0; i < curQuestion.value.options.length; i++) {
					curQuestionOptionIndex.push(String.fromCharCode('A'.charCodeAt(0) + i));
				}
			} else {
				curQuestionOptionIndex.push('T');
				curQuestionOptionIndex.push('F');
			}
		};

		const showModal = () => {
			summaryVisible.value = true;
		};

		onMounted(() => {
			getTeacherPaper();
		});

		return {
			teacherPaper,
			questionNumberList,
			summaryVisible,
			totalStudentNumber,
			totalQuestionNumber,
			curQuestion,
			curQuestionIndex,
			option,

			getTeacherPaper,
			onTabChange,
			showModal
		};
	}
};
</script>
<style>
.chart {
	height: 400px;
}
.my-bottom {
	margin-bottom: 5px;
}
.my-header {
	background-color: #fff !important;
	margin-bottom: 10px !important;
	height: 44px !important;
	line-height: 44px !important;
}
.my-dot-left::before {
	content: '';
	display: inline-block;
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background-color: #52c41a;
	margin-right: 10px;
}
.my-dot-mid::before {
	content: '';
	display: inline-block;
	width: 12px;
	height: 12px;
	background-color: #a6cafa;
	border-radius: 50%;
	margin-right: 10px;
}
.my-dot-right::before {
	content: '';
	display: inline-block;
	width: 12px;
	height: 12px;
	background-color: #e7e7e7;
	border-radius: 50%;
	margin-right: 10px;
}
</style>