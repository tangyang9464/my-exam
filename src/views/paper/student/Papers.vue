<template>
    <a-layout style="min-height: 100vh">
        <a-layout>
            <a-layout-header class="my-header" />
            <a-layout-content style="padding:0 25px" class="my-scroll">
                <a-empty description="暂无待做试卷" style="top:50%;left:50%;position: absolute;" v-if="papers.length==0" />
                <a-row type="flex" :gutter="20">
                    <a-col v-for="paper,key in papers" :key="key">
                        <a-card hoverable style="width: 300px;margin-bottom: 50px;">
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

                            <div class="my-text-center">
                                <a-typography-text type="secondary">限时：{{paper.totalTime/60}}分钟</a-typography-text>
                            </div>

                            <div class="my-text-center">
                                <a-typography-text type="secondary">开始时间：{{dataFormat(paper.allowedStartTime)}}</a-typography-text>
                            </div>

                            <div class="my-text-center">
                                <a-typography-text type="secondary">截止时间：{{dataFormat(paper.deadline)}}</a-typography-text>
                            </div>

                            <div class="my-text-center">
                                <a-typography-text type="secondary">得分：</a-typography-text>
                                <a-typography-text type="success" style="font-size:19px;">{{paper.obtainScore}}</a-typography-text>
                            </div>

                            <div class="my-text-center">
                                <a-button type="primary" disabled v-if="new Date(paper.allowedStartTime).getTime() > Date.now()">未开始</a-button>
                                <template v-else>
                                    <a-button type="primary" @click="startAnswering(paper)" v-if="paper.finishStatus==0">开始答题</a-button>
                                    <router-link :to="'/paperDetail/' + paper.id">
                                        <a-button type="primary" v-if="paper.finishStatus==1">继续答题</a-button>
                                        <a-button type="primary" v-if="paper.finishStatus==2">查看试卷</a-button>
                                    </router-link>
                                </template>
                            </div>
                        </a-card>
                    </a-col>
                </a-row>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
import { defineComponent } from 'vue';

import paperApi from '@/api/paper';
import { message } from 'ant-design-vue';
import cookies from 'vue-cookies';
import moment from 'moment';
import { useRouter } from 'vue-router';

export default defineComponent({
	components: {},
	methods: {
		dataFormat(time) {
			if (time == undefined) {
				return '';
			}
			return moment(time).format('YYYY-MM-DD HH:mm');
		},
		startAnswering(paper) {
			let params = {
				studentId: this.studentId,
				paperId: paper.id
			};
			paperApi
				.startAnswering(params)
				.then(result => {
					if (result.code == 200) {
						this.router.push('/paperDetail/' + paper.id);
					}
				})
				.catch(reason => {
					message.error('出错了' + reason);
				});
		}
	},
	mounted() {
		this.router = useRouter();
		this.studentId = cookies.get('userId');
		let params = {
			studentId: this.studentId
		};
		paperApi
			.undonePapers(params)
			.then(result => {
				this.papers = result.data;
			})
			.catch(reason => {
				message.error('出错了' + reason);
			});
	},

	data() {
		return {
			studentId: '',
			papers: [],
			router: ''
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
}
.my-text-center {
	text-align: center;
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
[data-theme='dark'] .site-layout .site-layout-background {
	background: #141414;
}
</style>