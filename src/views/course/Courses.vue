<template>
    <a-layout style="min-height: 100vh">
        <a-layout>
            <a-layout-header class="my-header">
                <a-row type="flex" justify="space-between">
                    <a-col>
                        <a-tabs>
                            <a-tab-pane key="1" :tab="role==0?'我上的课':'我教的课'">
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="">
                            </a-tab-pane>
                        </a-tabs>
                    </a-col>
                    <a-col>
                        <a-row type="flex" align="right" :gutter="20">
                            <a-col v-if="role==0">
                                <a-typography-text @click='showModal("courseVisible")' class="my-hover">
                                    历史课堂
                                </a-typography-text>

                                <a-modal v-model:visible="courseVisible" :footer="null" okText="确认" cancelText="取消">
                                    <a-typography-title :level="4" style="margin-bottom: 20px">
                                        历史课堂
                                    </a-typography-title>

                                    <a-card v-if="historyRooms.length==0">
                                        <a-empty description="暂无历史课堂" />
                                    </a-card>

                                    <a-card v-for="room in historyRooms" :key="room.id">
                                        <a-typography-title :level="5">
                                            {{room.course}}
                                        </a-typography-title>

                                        <a-row type="flex" justify="space-between" :gutter="80">
                                            <a-col>
                                                {{room.schoolClass}}班
                                            </a-col>
                                            <a-col>
                                                {{room.studentNumber}}人
                                            </a-col>
                                            <a-col>
                                                <a-typography-link target="_blank" @click="exitHistoryRoom(room.id)">
                                                    移出
                                                </a-typography-link>
                                            </a-col>
                                        </a-row>
                                    </a-card>
                                </a-modal>
                            </a-col>
                            <a-col v-if="role==0">
                                <a-typography-text @click="showModal" class="my-hover">
                                    加入课堂
                                </a-typography-text>

                                <a-modal v-model:visible="addCourseVisible" @ok="joinRoom()" okText="确认" cancelText="取消">
                                    <a-typography-title :level="5">
                                        课堂暗号
                                    </a-typography-title>
                                    <a-input v-model:value="roomId" />
                                </a-modal>
                            </a-col>

                            <a-col v-else>
                                <a-typography-text @click="showModal('createRoomVisible')" class="my-hover">
                                    创建课堂
                                </a-typography-text>

                                <a-modal v-model:visible="createRoomVisible" @ok="createRoom()" okText="确认" cancelText="取消">
                                    <div>
                                        <a-typography-title :level="5">
                                            课程
                                        </a-typography-title>
                                        <a-input v-model:value="course" />
                                        <a-typography-title :level="5">
                                            班级
                                        </a-typography-title>
                                        <a-input v-model:value="schoolClass" />
                                    </div>
                                </a-modal>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </a-layout-header>
            <a-layout-content style="padding:0 25px" class="my-scroll">
                <a-empty description="暂无已加入的课堂" style="top:50%;left:50%;position: absolute;" v-if="empty" />
                    <a-row type="flex" :gutter="20">
                        <a-col v-for="room, key in rooms" :key="room.id">
                            <router-link :to="'/courseDetail/' + room.id">
                                <a-card hoverable :style="'border-radius: 5%;width: 300px;margin-bottom: 50px;background-image: '+color(key)">
                                    <a-row type="flex" justify="space-between" align="middle" style="margin-bottom: 50px;">
                                        <a-col>
                                            <a-typography-text style="color:#ffffff;font-weight:500;font-size:19px" :level="3">{{room.course}}</a-typography-text>
                                        </a-col>
                                        <a-col v-if="role==0">
                                            <a-dropdown>
                                                <EllipsisOutlined :style="{ fontSize: '25px', color: '#ffffff'}" />
                                                <template #overlay>
                                                    <a-menu>
                                                        <a-menu-item>
                                                            <div class="my-hover" @click="joinHistoryRoom(room.id)">加入历史课堂</div>
                                                        </a-menu-item>
                                                        <a-menu-item>
                                                            <div class="my-hover" @click="exitRoom(room.id)">退出课堂</div>
                                                        </a-menu-item>
                                                    </a-menu>
                                                </template>
                                            </a-dropdown>
                                        </a-col>
                                        <a-col v-else>
                                            <a-dropdown>
                                                <EllipsisOutlined :style="{ fontSize: '25px', color: '#ffffff'}" />
                                                <template #overlay>
                                                    <a-menu>
                                                        <a-menu-item>
                                                            <div class="my-hover" @click="editRoom(room)">编辑</div>
                                                        </a-menu-item>
                                                        <!-- <a-menu-item>
                                                        <div class="my-hover" @click="exitRoom(room.id)">删除</div>
                                                    </a-menu-item> -->
                                                    </a-menu>
                                                </template>
                                            </a-dropdown>
                                        </a-col>
                                    </a-row>
                                    <a-row type="flex" justify="space-between" align="middle">
                                        <a-col v-if="role==0">
                                            <a-avatar :src="'http://localhost:9090/upload/'+room.teacherAvatar" />
                                            <span style="vertical-align: middle;margin-left:10px;color:#ffffff">{{room.teacherName}}</span>
                                        </a-col>
                                        <a-col v-else>
                                            <UserOutlined :style="{color: '#ffffff'}"/>
                                            <a-typography-text style="margin-left:5px;color:#ffffff">{{room.studentNumber}}</a-typography-text>
                                        </a-col>
                                        <a-col>
                                            <HomeFilled :style="{color: '#ffffff'}"/>
                                            <a-typography-text style="margin-left:5px;color:#ffffff">{{room.schoolClass}}班</a-typography-text>
                                        </a-col>
                                        <a-col v-if="role==1">
                                            <a-typography-text style="color: #ffffff" :copyable="getCopyText(room.id)">课堂暗号</a-typography-text>
                                        </a-col>
                                    </a-row>
                                </a-card>
                            </router-link>
                        </a-col>
                    </a-row>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
import {EllipsisOutlined, UserOutlined,HomeFilled } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import cookies from 'vue-cookies';
import classroomApi from '@/api/classroom';

export default {
	components: {
		EllipsisOutlined,
		UserOutlined,
		HomeFilled
	},
	data() {
		return {
			courseVisible: false,
			createRoomVisible: false,
			addCourseVisible: false,
			roomId: '',
			historyRooms: [],
			rooms: [],
			userId: '',
			role: '0',
			course: '',
			schoolClass: '',
			editRoomId: null,
			empty: false
		};
	},
	methods: {
		getCopyText(roomId) {
			return { text: roomId };
		},
		joinRoom() {
			let params = {
				roomId: this.roomId,
				studentId: this.userId
			};
			var vue = this;
			classroomApi
				.join(params)
				.then(result => {
					if (result.code === 200) {
						message.success('加入成功');
						vue.addCourseVisible = false;
						vue.NowRooms();
					} else {
						message.warning('找不到该课堂，请重试');
					}
				})
				.catch(reason => {
					message.error('加入课堂出错了' + reason);
				});
		},
		editRoom(room) {
			this.createRoomVisible = true;
			this.editRoomId = room.id;
			this.course = room.course;
			this.schoolClass = room.schoolClass;
		},
		createRoom() {
			let params = {
				roomId: this.editRoomId,
				course: this.course,
				schoolClass: this.schoolClass,
				teacherId: this.userId
			};
			classroomApi
				.create(params)
				.then(result => {
					if (result.code == 200) {
						this.NowTeacherRooms();
						this.createRoomVisible = false;
					}
				})
				.catch(reason => {
					message.error('出错了' + reason);
				});
		},
		historyRoomsList() {
			let params = {
				studentId: this.userId
			};
			classroomApi
				.historyList(params)
				.then(result => {
					this.historyRooms = result.data;
				})
				.catch(reason => {
					message.error('出错了:' + reason);
				});
		},
		NowRooms() {
			let params = {
				studentId: this.userId
			};
			classroomApi
				.list(params)
				.then(result => {
					this.rooms = result.data;
					if (this.rooms.length == 0) {
						this.empty = true;
					}
				})
				.catch(reason => {
					message.error('出错了:' + reason);
				});
		},
		NowTeacherRooms() {
			let params = {
				teacherId: this.userId
			};
			classroomApi
				.listTeacherRoom(params)
				.then(result => {
					this.rooms = result.data;
					if (this.rooms.length == 0) {
						this.empty = true;
					}
				})
				.catch(reason => {
					message.error('出错了:' + reason);
				});
		},
		color(index){
			// let max = 3,min=0;
			// index = parseInt(Math.random()*(max-min+1)+min,10);
			index = index % 4;
			switch(index){
				case 0:
					return 'linear-gradient(to bottom right, #8360fa, #cb8dff)';
				case 1: 
					return 'linear-gradient(to bottom right, #4762f3, #5cc3ff)';
				case 2:
					return 'linear-gradient(to bottom right, #ff6098, #ffa96a)'
				case 3: 
					return 'linear-gradient(to bottom right, #1fbdb8, #47e894)'
			}
		},
		joinHistoryRoom(roomId) {
			let params = {
				roomId: roomId,
				studentId: this.userId
			};
			console.log(params);
			var vue = this;
			classroomApi
				.joinHistoryRoom(params)
				.then(result => {
					if (result.code === 200) {
						message.success('加入历史课堂成功');
						vue.NowRooms();
					} else {
						message.warning('添加失败');
					}
				})
				.catch(reason => {
					message.error('出错了:' + reason);
				});
		},
		exitHistoryRoom(roomId) {
			let params = {
				roomId: roomId,
				studentId: this.userId
			};
			var vue = this;
			classroomApi
				.exitHistoryRoom(params)
				.then(result => {
					if (result.code === 200) {
						message.success('移出历史课堂成功');
						vue.NowRooms();
						vue.historyRoomsList();
					} else {
						message.warning('移出失败');
					}
				})
				.catch(reason => {
					message.error('出错了:' + reason);
				});
		},
		exitRoom(roomId) {
			let params = {
				roomId: roomId,
				studentId: this.userId
			};
			var vue = this;
			classroomApi
				.exit(params)
				.then(result => {
					if (result.code === 200) {
						message.success('退出课堂成功');
						vue.NowRooms();
					} else {
						message.warning('退出失败');
					}
				})
				.catch(reason => {
					message.error('出错了:' + reason);
				});
		},
		showModal(name) {
			if (name == 'courseVisible') {
				this.courseVisible = true;
				this.historyRoomsList();
			} else if (name == 'createRoomVisible') {
				this.createRoomVisible = true;
			} else {
				this.addCourseVisible = true;
			}
		},
		handleOk(name) {
			name == 'courseVisible' ? (this.courseVisible = false) : (this.addCourseVisible = false);
		}
	},
	mounted() {
		this.userId = cookies.get('userId');
		this.role = cookies.get('userRole');
		if (this.role == 0) {
			this.NowRooms();
		} else {
			this.NowTeacherRooms();
		}
	}
};
</script>
<style>
.my-hover:hover {
	color: #4f95f5;
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

.site-layout .site-layout-background {
	background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
	background: #141414;
}
.ant-typography-expand, .ant-typography-edit, .ant-typography-copy{
	color:#ffffff !important
}
</style>