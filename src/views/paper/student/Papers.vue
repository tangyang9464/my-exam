<template>
    <a-layout style="min-height: 100vh">
        <a-layout>
            <a-layout-header class="my-header" >
				<a-tabs>
					<a-tab-pane key="1" tab="试卷集">
					</a-tab-pane>
					<a-tab-pane key="2" tab="">
					</a-tab-pane>
				</a-tabs>
			</a-layout-header>
            <a-layout-content style="padding:0 25px" class="my-scroll">
                <!-- <a-empty description="暂无待做试卷" style="top:50%;left:50%;position: absolute;" v-if="papers.length==0" /> -->
                <a-list class="demo-loadmore-list" item-layout="horizontal" :data-source="papers">
                    <template #renderItem="{ item }">
                        <a-list-item style="border-radius: 4px;padding: 8px 12px;background: #ffffff;margin: 8px 0;">
                            <!-- <a-skeleton avatar :title="false" active> -->
                                <a-list-item-meta style="margin: auto 8px auto 0;font-size: 25px;" description="结束时间：2019/08/11 12:00:00">
                                    <template #title>
										<router-link v-if="role==0" :to="'/papers/'+item.id">
                                        	<a href="#">{{item.publishName}}</a>
										</router-link>

										<router-link v-else :to="'/summaryPaper/'+item.id">
                                        	<a href="#">{{item.publishName}}</a>
										</router-link>
                                    </template>
                                    <template #avatar>
                                        <DesktopOutlined />
                                    </template>
                                </a-list-item-meta>
                                <UserOutlined />
                                <div style="margin:0 10px 0 5px">{{item.teacherName}}</div>
                                <!-- <div style="height: 20px;border-radius: 4px;color: #fff;line-height: 20px;font-size: 12px;padding: 0 6px;text-align: center;background-color: rgb(153, 153, 153);">
                                    已关闭
                                </div> -->
								<div style="height: 20px;border-radius: 4px;color: #fff;line-height: 20px;font-size: 12px;padding: 0 6px;text-align: center;background-color: rgb(27, 117, 220);">
                                    待完成	
                                </div>
                        </a-list-item>
                    </template>
                </a-list>
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
import { useRouter } from 'vue-router';

import { DesktopOutlined, UserOutlined } from '@ant-design/icons-vue';

export default defineComponent({
	setup() {
		const initLoading = ref(true);
		const loading = ref(false);
		const data = ref([]);
		const papers = ref([]);
		const studentId = cookies.get('userId');
		const router = useRouter();
		const role = ref(cookies.get('userRole'));

		const fetch = () => {
			let params = {
				studentId: studentId
			};
			paperApi
				.undonePapers(params)
				.then(result => {
					initLoading.value = false;
					loading.value = false;
					papers.value = result.data;
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
			papers,
			role,

			fetch,
			dataFormat,
			startAnswering
		};
	},
	components: {
		DesktopOutlined,
		UserOutlined
	},
	methods: {}
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
.demo-loadmore-list {
	min-height: 350px;
}
.ant-list-item-meta-title > a {
	color: hsl(212, 89%, 53%) !important;
}
.ant-list-item-meta-description {
    font-size: 13px !important;
}
</style>