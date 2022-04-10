<template>
    <a-layout style="min-height: 100vh">
        <a-layout>
            <a-layout-header class="my-header" >
				<a-tabs>
					<a-tab-pane key="1" tab="历史记录">
					</a-tab-pane>
					<a-tab-pane key="2" tab="">
					</a-tab-pane>
				</a-tabs>
			</a-layout-header>
            <a-layout-content style="padding:0 25px" class="my-scroll">
                <!-- <a-empty description="暂无考试记录" style="top:50%;left:50%;position: absolute;" v-if="recordData!=undefined && recordData.length==0" /> -->
                <a-list class="demo-loadmore-list" item-layout="horizontal" :data-source="recordData">
                    <template #renderItem="{ item }">
                        <a-list-item style="border-radius: 4px;padding: 8px 12px;background: #ffffff;margin: 8px 0;">
                            <!-- <a-skeleton avatar :title="false" active> -->
                            <a-list-item-meta style="margin: auto 8px auto 0;font-size: 25px;" description="结束时间: 2019/08/11 12:00:00">
                                <template #title>
                                    <router-link :to="'/papers/'+item.id">
                                        <a href="#">{{item.publishName}}</a>
                                    </router-link>
                                </template>
                                <template #avatar>
                                    <DesktopOutlined />
                                </template>
                            </a-list-item-meta>
                            <UserOutlined />
                            <div style="margin:0 10px 0 5px">{{item.teacherName}}</div>
                            <div style="height: 20px;border-radius: 4px;color: #fff;line-height: 20px;font-size: 12px;padding: 0 6px;text-align: center;background-color: rgb(153, 153, 153);">
                                已关闭
                            </div>
                        </a-list-item>
                    </template>
                </a-list>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
import recordApi from '@/api/record';
import { message } from 'ant-design-vue';
import moment from 'moment';
import cookies from 'vue-cookies';
import {UserOutlined, DesktopOutlined } from '@ant-design/icons-vue';

export default {
	components: { UserOutlined, DesktopOutlined },

	data() {
		return {
			selectedKeys: '1',
			studentId: '',
			recordData: undefined
		};
	},
	methods: {
		dataFormat(time) {
			return moment(time).format('YYYY-MM-DD HH:mm');
		},
		getRecords() {
			let params = {
				studentId: this.studentId
			};
			recordApi
				.list(params)
				.then(result => {
					this.recordData = result.data;
				})
				.catch(reason => {
					message.error('出错了' + reason);
				});
		}
	},
	mounted() {
		this.studentId = cookies.get('userId');
		this.getRecords();
	}
};
</script>
<style>
.my-header {
	background-color: #fff !important;
	margin-bottom: 10px !important;
	height: 44px !important;
	line-height: 44px !important;
}
.my-bottom {
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