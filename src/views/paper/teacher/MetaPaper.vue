<template>
    <a-layout style="min-height: 100vh">
        <a-layout>
            <a-layout-header class="my-header">
                <a-row type="flex" align="right" :gutter="20">
                    <a-col>
                        <PlusCircleTwoTone two-tone-color="#1890ff" />
                        <a-typography-link @click="showModal">
                            新建试卷
                        </a-typography-link>
                        <a-modal v-model:visible="createMetaPaperVisible" @ok="createMetaPaper()">
                            <div>
                                <a-typography-title :level="5">
                                    试卷名称
                                </a-typography-title>
                                <a-input v-model:value="metaPaperObj.paperName" />
                            </div>
                        </a-modal>
                    </a-col>
                </a-row>
            </a-layout-header>

            <a-layout-content style="padding:0 25px" class="my-scroll">
                <!-- <a-empty description="暂无待做试卷" style="top:50%;left:50%;position: absolute;" v-if="metaPapers.length==0" /> -->
                <a-list class="demo-loadmore-list" item-layout="horizontal" :data-source="metaPapers">
                    <template #renderItem="{ item }">
                        <a-list-item style="border-radius: 4px;padding: 8px 30px;background: #ffffff;margin: 8px 0;">
                            <!-- <a-skeleton avatar :title="false" active> -->
                            <a-list-item-meta style="margin: auto 8px auto 0;font-size: 25px;" description="结束时间: 2019/08/11 12:00:00">
                                <template #title>
                                    <router-link :to="'/metaPaperDetail/'+item.id">
                                        <a href="/">{{item.paperName}}</a>
                                    </router-link>
                                </template>
                                <template #avatar>
                                    <DesktopOutlined />
                                </template>
                            </a-list-item-meta>
                            <router-link :to="'/metaPaperDetail/'+item.id">
                                <div style="margin:0 10px 0 20px">
                                    <EditOutlined style="color:#1890ff;margin-right:5px" />
                                    <a>编辑</a>
                                </div>
                            </router-link>
                            <div style="margin:0 10px 0 20px" @click="showPublishModal(item)">
                                <SendOutlined style="color:#1890ff;margin-right:5px" />
                                <a>发布</a>
                            </div>
                            <div style="margin:0 10px 0 20px" @click="deleteMetaPaper(item.id)">
                                <DeleteOutlined style="color:#1890ff;margin-right:5px" />
                                <a>删除</a>
                            </div>
                        </a-list-item>
                    </template>
                </a-list>
                <!-- <a-row type="flex" :gutter="20">
                    <a-col v-for="paper,key in metaPapers" :key="key">
                        <a-card hoverable style="width: 300px;margin-bottom: 50px;">

                            <a-row type="flex" justify="center" align="middle">
                                <a-col>
                                    <a-typography-title :level="4">{{paper.paperName}}</a-typography-title>
                                </a-col>
                            </a-row>

                            <a-row type="flex" justify="center" align="middle" class="my-bottom">
                                <a-col>
                                    <a-typography-text type="secondary">满分：</a-typography-text>
                                </a-col>
                                <a-col>
                                    <a-typography-text type="secondary">{{paper.totalScore}}分</a-typography-text>
                                </a-col>
                            </a-row>
                            <a-row type="flex" justify="center" align="middle" class="my-bottom">
                                <a-col>
                                    <a-typography-text type="secondary">共{{paper.questionNumber}}题</a-typography-text>
                                </a-col>
                            </a-row>
                            <a-row type="flex" justify="center" align="middle" class="my-bottom">
                                <a-col>
                                    <a-typography-text type="secondary">创建时间：{{dataFormat(paper.createTime)}}</a-typography-text>
                                </a-col>
                            </a-row>
                            <a-row type="flex" justify="center" align="middle" class="my-bottom">
                                <a-col>
                                    <a-typography-text type="secondary">修改时间：{{dataFormat(paper.updateTime) || dataFormat(paper.createTime)}}</a-typography-text>
                                </a-col>
                            </a-row>

                            <template #actions class="ant-card-actions">
                                <router-link :to="'/metaPaperDetail/'+paper.id">

                                    <a-tooltip>
                                        <template #title>编辑</template>
                                        <EditOutlined />
                                    </a-tooltip>
                                </router-link>

                                <a-tooltip @click="showPublishModal(paper)">
                                    <template #title>发布</template>
                                    <SendOutlined />
                                </a-tooltip>

                                <a-tooltip @click="deleteMetaPaper(paper.id)">
                                    <template #title>
                                        删除
                                    </template>
                                    <DeleteOutlined />
                                </a-tooltip>
                            </template>
                        </a-card>
                    </a-col>
                </a-row> -->

                <a-modal v-model:visible="publishModalVisible" title="发布试卷" @ok="publishPaper()">
                    <a-form :model="paperInfo" class="login-form" @submit="submit">
                        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" label="发送课堂" name="schoolClass">
                            <a-select v-model:value="publishInfo.roomIds" mode="multiple" style="width: 100%" placeholder="选择发送课堂" :options="publishSchoolClass"></a-select>
                        </a-form-item>
                        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" label="发布名称" name="examName">
                            <a-input v-model:value="publishInfo.publishName"></a-input>
                        </a-form-item>
                        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" label="考试时长" name="totalTime">
                            <a-select v-model:value="publishInfo.totalTime" show-search @change="handleChange" @search="handleSearch" placeholder="输入或选择时长" style="width: 200px" :options="totalTimeOptions"></a-select>
                        </a-form-item>
                        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" label="考试开始时间" name="examName">
                            <a-date-picker v-model:value="publishInfo.allowedStartTime" show-time placeholder="选择开始时间" @change="onChange" @ok="onOk" />
                        </a-form-item>
                        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" label="考试截止时间" name="examName">
                            <a-date-picker v-model:value="publishInfo.deadline" show-time placeholder="选择截止时间" @change="onChange" @ok="onOk" />
                        </a-form-item>
                    </a-form>
                </a-modal>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
import {
	SendOutlined,
	EditOutlined,
	DeleteOutlined,
	PlusCircleTwoTone,
	DesktopOutlined
} from '@ant-design/icons-vue';
import { getCurrentInstance, onMounted, reactive, ref, toRaw } from 'vue';
import paperApi from '@/api/paper';
import moment from 'moment';
import classroomApi from '@/api/classroom';

export default {
	components: {
		DesktopOutlined,
		SendOutlined,
		EditOutlined,
		DeleteOutlined,
		PlusCircleTwoTone
	},
	setup() {
		const { proxy } = getCurrentInstance();
		const createMetaPaperVisible = ref(false);
		const metaPapers = ref([]);
		const teacherId = proxy.$cookies.get('userId');
		const metaPaperObj = reactive({
			teacherId: teacherId
		});
		const publishInfo = reactive({
			teacherId: teacherId,
			metaPaperId: '',
			undoneNumbers: [],
			publishName: '',
			roomIds: [],
			totalTime: 30
		});
		const publishModalVisible = ref(false);
		const rawTotalTimeOptions = [
			{
				value: 30,
				label: 30
			},
			{
				value: 60,
				label: 60
			},
			{
				value: 90,
				label: 90
			}
		];
		const totalTimeOptions = ref(rawTotalTimeOptions);

		const publishSchoolClass = ref([]);

		const showModal = () => {
			createMetaPaperVisible.value = true;
		};

		const showPublishModal = paper => {
			publishInfo.metaPaperId = paper.id;
			publishInfo.publishName = paper.paperName;
			publishModalVisible.value = true;
			fetchSchoolClass();
		};

		const roomStudentNumber = {};

		const publishPaper = () => {
			let publishInfoCopy = toRaw(publishInfo);
			publishInfoCopy.totalTime *= 60;
			for (let tempId of publishInfoCopy.roomIds) {
				publishInfoCopy.undoneNumbers.push(roomStudentNumber[tempId]);
			}
			paperApi
				.publishPaper(publishInfoCopy)
				.then(result => {
					if (result.code == 200) {
						proxy.$message.success('发布成功');
						publishModalVisible.value = false;
					} else {
						proxy.$message.error('出错了' + result.msg);
					}
				})
				.catch(reason => {
					proxy.$message.error('出错了' + reason);
				});
		};

		const createMetaPaper = () => {
			paperApi
				.createMetaPaper(metaPaperObj)
				.then(result => {
					if (result.code == 200) {
						NowMetaPaper();
						proxy.$message.success('创建成功');
						createMetaPaperVisible.value = false;
					} else {
						proxy.$message.error('出错了' + result.msg);
					}
				})
				.catch(reason => {
					proxy.$message.error('出错了' + reason);
				});
		};
		const NowMetaPaper = () => {
			let params = {
				teacherId: teacherId
			};
			paperApi
				.metaPapers(params)
				.then(result => {
					metaPapers.value = result.data;
				})
				.catch(reason => {
					proxy.$message.error('出错了' + reason);
				});
		};
		const deleteMetaPaper = paperId => {
			let params = {
				paperId: paperId
			};
			paperApi
				.deleteMetaPaper(params)
				.then(result => {
					if (result.code == 200) {
						NowMetaPaper();
						proxy.$message.success('删除成功');
					} else {
						proxy.$message.error('出错了' + result.msg);
					}
				})
				.catch(reason => {
					proxy.$message.error('出错了' + reason);
				});
		};

		onMounted(() => {
			NowMetaPaper();
		});
		const dataFormat = time => (time == undefined ? '' : moment(time).format('YYYY-MM-DD HH:mm'));

		const fetchSchoolClass = () => {
			let params = {
				teacherId: teacherId
			};
			classroomApi
				.listTeacherRoom(params)
				.then(result => {
					let rooms = result.data;
					const arr = [];
					for (let room of rooms) {
						arr.push({
							value: room.id,
							label: room.course + '-' + room.schoolClass
						});
						roomStudentNumber[room.id] = room.studentNumber;
					}
					publishSchoolClass.value = arr;
				})
				.catch(reason => {
					proxy.$message.error('出错了:' + reason);
				});
		};
		const tempTimeInput = ref(0);
		const handleSearch = val => {
			if (isNaN(val) || val == '') {
				return;
			}
			let arr = [];
			arr.push({
				value: val,
				label: val
			});
			totalTimeOptions.value = arr;
		};

		const handleChange = () => {
			totalTimeOptions.value = rawTotalTimeOptions;
		};

		return {
			tempTimeInput,
			metaPapers,
			teacherId,
			createMetaPaperVisible,
			metaPaperObj,
			publishInfo,
			publishModalVisible,
			totalTimeOptions,
			publishSchoolClass,

			dataFormat,
			createMetaPaper,
			NowMetaPaper,
			showModal,
			deleteMetaPaper,
			publishPaper,
			showPublishModal,
			handleSearch,
			handleChange
		};
	}
};
</script>
<style>
.my-bottom {
	margin-bottom: 5px;
}
.my-header {
	background-color: #fff !important;
	margin-bottom: 10px !important;
	height: 44px !important;
	line-height: 44px !important;
}
#components-layout-demo-side .logo {
	height: 32px;
	margin: 16px;
	background: rgba(255, 255, 255, 0.3);
}
.ant-card-actions {
	background-color: #ffffff !important;
}

.site-layout .site-layout-background {
	background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
	background: #141414;
}
</style>