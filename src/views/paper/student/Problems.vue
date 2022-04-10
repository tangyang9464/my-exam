<template>
    <a-layout style="min-height: 100vh">
        <a-layout style="background:#ffffff">
            <a-layout-header class="my-header">{{paper.publishName}}</a-layout-header>
            <a-layout-content style="padding:0 25px" class="my-scroll">
                <!-- <a-card hoverable style="width: 70%;" title="操作系统"> -->
                <a-row type="flex" justify="space-between">
                    <a-col span="12">
                        <a-row type="flex" justify="space-between">
                            <a-col>
                                <div class="label_3XKMT">满分</div>
                            </a-col>
                            <a-col>
                                <span class="value_2e-rV">{{paper.totalScore}}分</span>
                            </a-col>
                        </a-row>

                        <a-row type="flex" justify="space-between" style="margin-top:35px">
                            <a-col>
                                <span class="label_3XKMT">题目数量</span>
                            </a-col>
                            <a-col>
                                <span class="value_2e-rV">{{paper.questionNumber}}题</span>
                            </a-col>
                        </a-row>

                        <a-row type="flex" justify="space-between" style="margin-top:35px">
                            <a-col>
                                <span class="label_3XKMT">限时 </span>
                            </a-col>
                            <a-col>
                                <span class="value_2e-rV">{{paper.totalTime/60}}分钟</span>
                            </a-col>
                        </a-row>

                        <a-row type="flex" justify="space-between" style="margin-top:35px">
                            <a-col>
                                <span class="label_3XKMT">开始时间</span>
                            </a-col>
                            <a-col>
                                <span class="value_2e-rV">{{dataFormat(paper.allowedStartTime)}}</span>
                            </a-col>
                        </a-row>

                        <a-row type="flex" justify="space-between" style="margin-top:35px">
                            <a-col>
                                <span class="label_3XKMT">截止时间</span>
                            </a-col>
                            <a-col>
                                <span class="value_2e-rV">{{dataFormat(paper.deadline)}}</span>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col span="11">
                        <div style="height: 50%;"></div>
                        <div style="height: 50%;background-color: aliceblue;padding: 17px 17px;">
                            <div class="label_3XKMT">
                                <ClockCircleOutlined />
                                固定时间
                            </div>
                            <div>考生仅能在试卷开始至结束时间内进行答题。</div>
                        </div>
                    </a-col>
                </a-row>

                <a-card style="margin-top: 40px;">
                    <a-row type="flex" justify="space-between">
                        <a-col>
                            <span class="label_3XKMT">开始答题时间</span>
                            <div style="margin-top: 10px;">{{dataFormat(paper.actualStartTime)}}</div>
                        </a-col>

                        <a-col>
                            <div class="my-text-center label_3XKMT">
                                <div>得分</div>
                                <a-typography-text type="success" style="font-size:19px;margin-top: 10px;">{{paper.obtainScore}}</a-typography-text>
                            </div>
                            <div class="my-text-center">
                                <a-button type="primary" disabled v-if="new Date(paper.allowedStartTime).getTime() > Date.now()">未开始</a-button>
                                <template v-else>
                                    <a-button type="primary" @click="startAnswering(paper)" v-if="paper.finishStatus==0">开始答题</a-button>
                                    <router-link :to="'/paperDetail/' + paper.id">
                                        <a-button type="primary" v-if="paper.finishStatus==1">继续答题</a-button>
                                        <a-button type="primary" ghost v-if="paper.finishStatus==2">查看试卷</a-button>
                                    </router-link>
                                </template>
                            </div>
                        </a-col>

                        <a-col>
                            <span class="label_3XKMT">截止答题时间</span>
                            <div style="margin-top: 10px;">{{dataFormat(paper.submitTime)}}</div>
                        </a-col>
                    </a-row>
                </a-card>
                <!-- </a-card> -->
                <!-- </a-col>
                </a-row> -->
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue';

import paperApi from '@/api/paper';
import { message } from 'ant-design-vue';
import cookies from 'vue-cookies';
import moment from 'moment';
import { useRoute, useRouter } from 'vue-router';
import { ClockCircleOutlined } from '@ant-design/icons-vue';

export default defineComponent({
	components: {
		ClockCircleOutlined
	},
	setup() {
		const initLoading = ref(true);
		const loading = ref(false);
		const data = ref([]);
		const paper = ref([]);
		const studentId = cookies.get('userId');
		const router = useRouter();
        const route = useRoute();

		const fetch = () => {
			let params = {
				studentPaperId: route.params.paperId
			};
			paperApi
				.getStudentPaper(params)
				.then(result => {
					paper.value = result.data;
				})
				.catch(reason => {
					message.error('出错了' + reason);
				});
		};

		const dataFormat = time => {
			if (time == undefined) {
				return '';
			}
			return moment(time).format('YYYY-MM-DD HH:mm');
		};

		const startAnswering = paper => {
			let params = {
				studentId: studentId,
				paperId: paper.id
			};
			paperApi
				.startAnswering(params)
				.then(result => {
					if (result.code == 200) {
						router.push('/paperDetail/' + paper.id);
					}
				})
				.catch(reason => {
					message.error('出错了' + reason);
				});
		};

		onMounted(() => {
			fetch();
		});

		return {
			loading,
			initLoading,
			data,
			paper,

			fetch,
			dataFormat,
			startAnswering
		};
	}
});
</script>
<style>
.my-header {
	background-color: #fff !important;
	margin-bottom: 10px !important;
	height: 44px !important;
	line-height: 44px !important;
	padding: 0 26px !important;
	font-size: 17px;
    border-bottom: 1px solid hsla(0, 0%, 0%, 0.06);;
}
.my-text-center {
	text-align: center;
}

#components-layout-demo-side .logo {
	height: 32px;
	margin: 16px;
	background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
	background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
	background: #141414;
}
.demo-loadmore-list {
	min-height: 350px;
}
.ant-list-item-meta-title > a {
	color: hsl(212, 89%, 53%) !important;
}
.ant-list-item-meta-description {
	font-size: 13px !important;
}
.label_3XKMT {
	font-weight: 600;
	font-family: fangsong;
	font-size: 16px;
	color: hsl(0, 0%, 10%);
	padding-top: 0.75rem;
	padding-bottom: 0.75rem;
}
.value_2e-rV {
	font-weight: 600;
	font-family: fangsong;
	font-size: 16px;
	color: hsl(0, 0%, 10%);
	padding-top: 0.75rem;
	padding-bottom: 0.75rem;
}
.ant-card-head-title {
	font-size: 18px;
	color: hsl(0, 0%, 10%) !important;
}
</style>