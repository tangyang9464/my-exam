<template>
    <a-layout style="min-height: 100vh">
        <a-layout>
            <div class="my-detail-header">
                <a-row type="flex" :gutter="[20,10]" v-if="roomAllData.room != undefined">
                    <a-col :span="24" style="margin-top: 10px">
                        <a-typography-title :level="3">{{roomAllData.room.course}}</a-typography-title>
                    </a-col>

                    <a-col v-if="role==0">
                        <a-avatar :src="'http://localhost:9090/upload/'+roomAllData.room.teacherAvatar" :size="25" />
                        <span style="vertical-align: middle;margin-left:10px">{{roomAllData.room.teacherName}}</span>
                    </a-col>
                    <a-col v-else>
                        <UserOutlined />
                        <a-typography-text style="margin-left:5px">{{roomAllData.room.studentNumber}}</a-typography-text>
                    </a-col>
                    <a-col>
                        <HomeOutlined style="vertical-align: middle" />
                        <span style="vertical-align: middle;margin-left:5px">{{roomAllData.room.schoolClass}}班</span>
                    </a-col>
                </a-row>

                <a-row>
                    <a-tabs>
                        <a-tab-pane key="1" tab="试卷">
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="成员管理" v-if="role==1">
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="" v-if="role==0">
                        </a-tab-pane>
                    </a-tabs>
                </a-row>
            </div>
            <a-layout-content style="padding:0 25px" class="my-scroll">
                <!-- <a-empty description="暂无试卷" style="top:50%;left:50%;position: absolute;" v-if="roomAllData.papers==undefined || roomAllData.papers.length==0" /> -->
                <a-list class="demo-loadmore-list" item-layout="horizontal" :data-source="roomAllData.papers">
                    <template #renderItem="{ item }">
                        <a-list-item style="border-radius: 4px;padding: 8px 12px;background: #ffffff;margin: 8px 0;">
                            <!-- <a-skeleton avatar :title="false" active> -->
                            <a-list-item-meta style="margin: auto 8px auto 0;font-size: 25px;" description="结束时间: 2019/08/11 12:00:00">
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
                            <UserOutlined v-if="role==0" />
                            <div style="margin:0 10px 0 5px" v-if="role==0">{{item.teacherName}}</div>
                            <template v-if="role==0">
                                <div v-if="item.finishStatus==2" style="height: 20px;border-radius: 4px;color: #fff;line-height: 20px;font-size: 12px;padding: 0 6px;text-align: center;background-color: rgb(153, 153, 153);">
                                    已关闭
                                </div>
                                <div v-else style="height: 20px;border-radius: 4px;color: #fff;line-height: 20px;font-size: 12px;padding: 0 6px;text-align: center;background-color: rgb(27, 117, 220);">
                                    待完成
                                </div>
                            </template>

                            <template v-else>
                                <div v-if="new Date(item.deadline).getTime() < Date.now()" style="height: 20px;border-radius: 4px;color: #fff;line-height: 20px;font-size: 12px;padding: 0 6px;text-align: center;background-color: rgb(153, 153, 153);">
                                    已截止
                                </div>
                                <div v-else style="height: 20px;border-radius: 4px;color: #fff;line-height: 20px;font-size: 12px;padding: 0 6px;text-align: center;background-color: rgb(27, 117, 220);">
                                    正在进行
                                </div>
                            </template>
                        </a-list-item>
                    </template>
                </a-list>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import { HomeOutlined, UserOutlined, DesktopOutlined } from '@ant-design/icons-vue';
import classroomApi from '@/api/classroom';
import { useRoute, useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import moment from 'moment';
import cookies from 'vue-cookies';
import paperApi from '@/api/paper';
export default {
	components: {
		HomeOutlined,
		UserOutlined,
		DesktopOutlined
	},
	data() {
		return {
			roomAllData: {},
			userId: '',
			role: '',
			router: ''
		};
	},
	mounted() {
		this.userId = cookies.get('userId');
		this.role = cookies.get('userRole');
		this.router = useRouter();
		console.log(this.role);
		const route = useRoute();
		if (this.role == 0) {
			let params = {
				studentId: this.userId,
				roomId: route.params.roomId
			};
			classroomApi
				.detail(params)
				.then(result => {
					this.roomAllData = result.data;
				})
				.catch(reason => {
					message.error('出错了' + reason);
				});
		} else {
			let params2 = {
				roomId: route.params.roomId
			};
			classroomApi
				.teacherDetail(params2)
				.then(result => {
					this.roomAllData = result.data;
				})
				.catch(reason => {
					message.error('出错了' + reason);
				});
		}
	},
	methods: {
		startAnswering(paper) {
			let params = {
				studentId: this.userId,
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
		},
		dataFormat(time) {
			if (time == undefined) {
				return '';
			}
			return moment(time).format('YYYY-MM-DD HH:mm');
		}
	}
};
</script>

<style>
.my-detail-header {
	height: 134px !important;
	background-color: #fff !important;
	margin-bottom: 10px !important;
	padding: 0 25px;
}
.my-scroll {
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
}
</style> 