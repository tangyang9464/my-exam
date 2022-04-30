<template>
    <a-layout style="min-height: 100vh">
        <a-layout-header class="my-header">
            <a-row type="flex" justify="space-between">
                <a-col>
                    <a-typography-paragraph v-model:content="metaPaper.paperName" style="font-weight: 600;font-size:18px" editable />
                </a-col>

                <a-col>
                    <a-button type="primary" size="small" @click="updateMetaPaper">保存</a-button>
                    &nbsp;&nbsp;
                    <router-link :to="'/metaPapers'">
                        <a-button size="small">取消</a-button>
                    </router-link>

                </a-col>
            </a-row>
        </a-layout-header>
        <a-layout-content style="padding:0 25px" class="my-scroll">
            <a-card>
                <a-row type="flex" :gutter="50">
                    <a-col>
                        试卷信息 (共 {{metaPaper.questionNumber}} 题,满分 {{metaPaper.totalScore}} 分)
                    </a-col>

                    <a-col>
                        <a-button type="primary" @click="showModal">
                            <template #icon>
                                <PlusOutlined />
                            </template>
                            添加习题
                        </a-button>
                        <a-modal centered="true" v-model:visible="visible" title="添加习题" @ok="createQuestion" :width="1000" ok-text="确认" cancel-text="取消">
                            <a-row type="flex" :gutter="[10,20]" id="flexbox" class="my-scroll">
                                <a-col :span="3" class="my-text-right">
                                    <div>题型</div>
                                </a-col>
                                <a-col :span="21">
                                    <a-select :options="options" v-model:value="newQuestion.questionType" @focus="focus" @change="handleChange" style="width:200px">
                                    </a-select>
                                </a-col>

                                <a-col :span="3" class="my-text-right">
                                    <div>题干</div>
                                </a-col>
                                <a-col :span="18">
                                    <Editor :tinymceScriptSrc="tinymceScriptSrc" v-model="newQuestion.stem" api-key="gx5xpm6qlw2n4mgdtwtxvspx8frzyhlztzyuoypix1tbqivt" :init=editorInit />
                                </a-col>

                                <a-col :span="3">
                                </a-col>
                                <a-checkbox-group class="my-text-right" v-model:value="newQuestion.correctAnswer" v-if="newQuestion.questionType==1" style="width: 100%;display: flex;flex-flow: row wrap;">
                                    <template v-for="option,key in newQuestion.options" :key="key">
                                        <a-col :span="3">
                                            <a-checkbox :value="key">
                                                选项{{String.fromCharCode('A'.charCodeAt(0) + key)}}.
                                            </a-checkbox>
                                            <a-typography-text v-if="newQuestion.correctAnswer!=undefined && newQuestion.correctAnswer.includes(key)" style="display:block" type="success">正确答案</a-typography-text>
                                        </a-col>

                                        <a-col :span="18">
                                            <Editor :tinymceScriptSrc="tinymceScriptSrc" v-model="newQuestion.options[key]" api-key="gx5xpm6qlw2n4mgdtwtxvspx8frzyhlztzyuoypix1tbqivt" :init=editorInit />
                                        </a-col>
                                        <a-col :span="3" class="my-text-right" style="text-align: left;">
                                            <a-popconfirm title="确定删除该选项吗?" ok-text="确定" cancel-text="取消" @confirm="deleteOption(key)">
                                                <MinusCircleTwoTone two-tone-color="red" style="fontSize:20px;margin-top:10px" />
                                            </a-popconfirm>
                                        </a-col>
                                    </template>
                                </a-checkbox-group>

                                <a-radio-group class="my-text-right" v-model:value="newQuestion.correctAnswer" v-if="newQuestion.questionType==0" style="width: 100%;display: flex;flex-flow: row wrap;">
                                    <template v-for="option,key in newQuestion.options" :key="key">
                                        <a-col :span="3">
                                            <a-radio :value="key">
                                                选项{{String.fromCharCode('A'.charCodeAt(0) + key)}}.
                                            </a-radio>
                                            <a-typography-text v-if="newQuestion.correctAnswer==key" style="display:block" type="success">正确答案</a-typography-text>
                                        </a-col>

                                        <a-col :span="18">
                                            <Editor :tinymceScriptSrc="tinymceScriptSrc" v-model="newQuestion.options[key]" api-key="gx5xpm6qlw2n4mgdtwtxvspx8frzyhlztzyuoypix1tbqivt" :init=editorInit />
                                        </a-col>
                                        <a-col :span="3" class="my-text-right" style="text-align: left;">
                                            <a-popconfirm title="确定删除该选项吗?" ok-text="确定" cancel-text="取消" @confirm="deleteOption(key)">
                                                <MinusCircleTwoTone two-tone-color="red" style="fontSize:20px;margin-top:10px" />
                                            </a-popconfirm>
                                        </a-col>
                                    </template>
                                </a-radio-group>

                                <template v-if="newQuestion.questionType!=2">
                                    <a-col :span="3" class="my-text-right">
                                        <div></div>
                                    </a-col>
                                    <a-col :span="21">
                                        <a-button type="primary" @click="createOption">
                                            新增选项
                                        </a-button>
                                    </a-col>
                                </template>

                                <template v-else>
                                    <a-col :span="3" class="my-text-right">
                                        <div>正确答案</div>
                                    </a-col>
                                    <a-col :span="21">
                                        <a-radio-group class="my-text-right" v-model:value="newQuestion.correctAnswer">
                                            <a-radio value="T">
                                                T
                                            </a-radio>

                                            <a-radio value="F">
                                                F
                                            </a-radio>
                                        </a-radio-group>
                                    </a-col>
                                </template>

                                <a-col :span="3" class="my-text-right">
                                    <div>本题分值</div>
                                </a-col>
                                <a-col :span="21">
                                    <a-input-number v-model:value="newQuestion.score" :min="0" :max="10" :step="0.1" style="width:200px;height:40px" />
                                </a-col>
                            </a-row>
                        </a-modal>
                    </a-col>
                </a-row>
            </a-card>
            <a-card v-if="metaPaper.questions.length!=0">
                <a-row type="flex" :gutter="50">
                    <a-col>
                        <a-checkbox v-model:checked="checkAll" :indeterminate="indeterminate" @change="onCheckAllChange">
                            全选
                        </a-checkbox>
                    </a-col>

                    <a-col>
                        <a-button type="text" size="small" :disabled="checkedList.length==0" @click="deleteQuestion">
                            <template #icon>
                                <DeleteOutlined />
                            </template>
                            删除
                        </a-button>
                    </a-col>
                </a-row>
            </a-card>

            <a-empty description="暂无试题，添加一个吧" style="top:50%;left:50%;position: absolute;" v-if="metaPaper.questions.length==0" />
            <a-checkbox-group v-model:value="checkedList" v-else style="width:100%" class="my-scroll">
                <div v-for="question,key in metaPaper.questions" :key="key">
                    <a-card>
                        <a-row :gutter="10">
                            <a-col>
                                <a-checkbox :value="key">
                                    {{key}}.
                                </a-checkbox>
                            </a-col>
                            <a-col style="max-width: 800px;">
                                <div v-html="question.stem">
                                </div>
                                <!-- 单选选择题 -->
                                <a-radio-group v-if="question.questionType == 0">
                                    <div v-for="option,key2 in question.options" :key="key2" class="radioStyle">
                                        <span class="ant-radio" :class="{'ant-radio-checked':key2==question.correctAnswer}">
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
                                        <span class="ant-checkbox" :class="{'ant-checkbox-checked':question.correctAnswer.includes(key2)}">
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
                                        <span class="ant-radio" :class="{'ant-radio-checked':'T'==question.correctAnswer}">
                                            <span class="ant-radio-inner"></span>
                                        </span>
                                        <span>
                                            T
                                        </span>
                                    </div>

                                    <div class="radioStyle">
                                        <span class="ant-radio" :class="{'ant-radio-checked':'F'==question.correctAnswer}">
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
                    </a-card>
                </div>
            </a-checkbox-group>

        </a-layout-content>
    </a-layout>
</template>

<script>
import { PlusOutlined, DeleteOutlined, MinusCircleTwoTone } from '@ant-design/icons-vue';
import { getCurrentInstance, onMounted, defineComponent, ref, reactive, toRefs, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import paperApi from '@/api/paper';
import Editor from '@tinymce/tinymce-vue';
export default defineComponent({
	setup() {
		const { proxy } = getCurrentInstance();
		const router = useRouter();
		const tinymceScriptSrc = '/tinymce/js/tinymce.min.js';
		const visible = ref(false);
		const state = reactive({
			indeterminate: false,
			checkAll: false,
			checkedList: []
		});
		// const teacherId = proxy.$cookies.get("userId");
		const route = useRoute();
		const metaPaper = ref({
			questions: []
		});

		const editorInit = {
			language_url: '/tinymce/langs/zh_CN.js',
			language: 'zh_CN',
			height: 150,
			// width: 600,
			plugins: 'link lists code table wordcount blankbracket',
			toolbar:
				'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink code | removeformat',
			// 此处为图片上传处理函数
			images_upload_handler: (blobInfo, success, failure) => {
				this.handleImgUpload(blobInfo, success, failure);
			},
			statusbar: true, // 底部的状态栏
			menubar: false, // 最上方的菜单
			branding: false // 水印“Powered by TinyMCE”
		};
		const maxQuestionNumber = ref(0);

		const options = ref([
			{
				value: 0,
				label: '单选'
			},
			{
				value: 1,
				label: '多选'
			},
			{
				value: 2,
				label: '判断'
			}
		]);

		const newQuestion = ref({
			stem: '本题要求实现一个计算m~n（m<n）之间所有整数的和的简单函数。',
			questionType: 1,
			options: [],
			score: 0,
			correctAnswer: undefined
		});

		const onCheckAllChange = e => {
			Object.assign(state, {
				checkedList: e.target.checked
					? Array.apply(null, {
							length: metaPaper.value.questions.length
					  }).map(Number.call, Number)
					: [],
				indeterminate: false
			});
		};

		watch(
			() => state.checkedList,
			val => {
				console.log(val);
				state.indeterminate = !!val.length && val.length < metaPaper.value.questions.length;
				state.checkAll = val.length === metaPaper.value.questions.length;
			}
		);

		const showModal = () => {
			newQuestion.value = {
				stem: '',
				questionType: 0,
				options: [],
				score: 1
			};
			visible.value = true;
		};

		const handleChange = () => {
			newQuestion.value.correctAnswer = undefined;
		};

		const handleOk = e => {
			console.log(e);
			visible.value = false;
		};

		const getMetaPaper = () => {
			let params = {
				paperId: route.params.paperId
			};
			paperApi
				.getMetaPaper(params)
				.then(result => {
					metaPaper.value = result.data;
					if (metaPaper.value.questions == null) {
						metaPaper.value.questions = [];
					}
				})
				.catch(reason => {
					proxy.$message.error('出错了' + reason);
				});
		};

		const createOption = () => {
			newQuestion.value.options.push('');
		};
		const deleteOption = index => {
			newQuestion.value.options.splice(index, 1);
		};
		const createQuestion = () => {
			if (metaPaper.value.questions == null) {
				metaPaper.value.questions = [];
			}
			if (newQuestion.value.questionType == 1) {
				newQuestion.value.options.sort();
			}
			metaPaper.value.questions.push(newQuestion.value);
			metaPaper.value.questionNumber++;
			metaPaper.value.totalScore += newQuestion.value.score;

			visible.value = false;
		};
		const deleteQuestion = () => {
			for (let index of state.checkedList) {
				let question = metaPaper.value.questions[index];
				metaPaper.value.questions.splice(index, 1);
				metaPaper.value.questionNumber--;
				metaPaper.value.totalScore -= question.score;
			}
			state.checkedList = [];
		};
		const updateMetaPaper = () => {
			paperApi
				.updateMetaPaper(metaPaper.value)
				.then(result => {
					if (result.code == 200) {
						proxy.$message.success('保存成功');
						router.push('/metaPapers');
					} else {
						proxy.$message.error('出错了' + result.msg);
					}
				})
				.catch(reason => {
					proxy.$message.error('出错了' + reason);
				});
		};

		onMounted(() => {
			getMetaPaper();
		});

		return {
			newQuestion,
			visible,
			route,
			metaPaper,
			editorInit,
			maxQuestionNumber,
			tinymceScriptSrc,
			options,
			...toRefs(state),
			onCheckAllChange,
			showModal,
			handleOk,
			getMetaPaper,
			createOption,
			deleteOption,
			createQuestion,
			deleteQuestion,
			updateMetaPaper,
			handleChange
		};
	},
	components: {
		PlusOutlined,
		DeleteOutlined,
		MinusCircleTwoTone,
		Editor
	}
});
</script>

<style>
.test {
	background-color: lime;
	flex: 1 1 auto;
	width: 100px;
	height: 50px;
}
.my-header {
	background-color: #fff !important;
	margin-bottom: 10px !important;
	height: 44px !important;
	line-height: 44px !important;
}
.my-scroll {
	height: 520px;
	overflow-x: hidden;
	overflow-y: auto;
}
.my-text-right {
	text-align: right;
}
</style>