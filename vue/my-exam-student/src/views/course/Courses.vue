<template>
    <a-layout style="min-height: 100vh">
        <a-layout>
            <a-layout-header class="my-header">
                <a-row type="flex" justify="space-between">
                    <a-col>
                        <a-tabs>
                            <a-tab-pane key="1" tab="我上的课">
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="">
                            </a-tab-pane>
                        </a-tabs>
                    </a-col>
                    <a-col>
                        <a-row type="flex" align="right" :gutter="20">
                            <a-col>
                                <a-typography-text @click='showModal("courseVisible")' class="my-hover">
                                    历史课堂
                                </a-typography-text>

                                <a-modal v-model:visible="courseVisible" :footer="null">
                                    <a-typography-title :level="4" style="margin-bottom: 20px">
                                        历史课堂
                                    </a-typography-title>

                                    <a-card v-for="room in historyRooms" :key="room.roomCode">
                                        <a-typography-title :level="5">
                                            {{room.course}}
                                        </a-typography-title>

                                        <a-row type="flex" justify="space-between" :gutter="80">
                                            <a-col>
                                                {{room.class}}
                                            </a-col>
                                            <a-col>
                                                {{room.studentNumber}}人
                                            </a-col>
                                            <a-col>
                                                <a-typography-link href="https://antdv.com" target="_blank">
                                                    移出
                                                </a-typography-link>
                                            </a-col>
                                        </a-row>
                                    </a-card>
                                </a-modal>
                            </a-col>

                            <a-col>
                                <a-typography-text @click="showModal" class="my-hover">
                                    加入课堂
                                </a-typography-text>

                                <a-modal v-model:visible="addCourseVisible" title="加入班级" @ok="joinCourse()">
                                    <a-typography-title :level="5">
                                        课堂暗号
                                    </a-typography-title>
                                    <a-input v-model:value="courseCode" />
                                </a-modal>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </a-layout-header>

            <a-layout-content style="padding:0 25px">
                <a-row type="flex" :gutter="20">
                    <a-col v-for="room in rooms" :key="room.roomCode">
                        <router-link :to="'/courseDetail/' + room.roomCode">
                            <a-card hoverable style="width: 300px;margin-bottom: 50px;">
                                <a-row type="flex" justify="space-between" align="middle" style="margin-bottom: 50px;">
                                    <a-col>
                                        <a-typography-title :level="3">{{room.course}}</a-typography-title>
                                    </a-col>
                                    <a-col>
                                        <a-dropdown>
                                            <EllipsisOutlined :style="{ fontSize: '25px' }" />
                                            <template #overlay>
                                                <a-menu>
                                                    <a-menu-item>
                                                        <div class="my-hover" @click="joinHistoryRoom(room.roomCode)">加入历史课堂</div>
                                                    </a-menu-item>
                                                    <a-menu-item>
                                                        <div class="my-hover" @click="exitRoom(room.roomCode)">退出课堂</div>
                                                    </a-menu-item>
                                                </a-menu>
                                            </template>
                                        </a-dropdown>
                                    </a-col>
                                </a-row>
                                <a-row type="flex" justify="space-between" align="middle">
                                    <a-col>
                                        <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        <span style="vertical-align: middle">{{room.teacherName}}</span>
                                    </a-col>
                                    <a-col>
                                        <HomeOutlined />
                                        <a-typography-text>{{room.class}}</a-typography-text>
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
import { HomeOutlined, EllipsisOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import classroomApi from "@/api/classroom";

export default {
    components: {
        HomeOutlined,
        EllipsisOutlined,
    },
    data() {
        return {
            courseVisible: false,
            addCourseVisible: false,
            courseCode: "",
            historyRooms: [],
            rooms: [],
            studentId: 32,
        };
    },
    methods: {
        joinCourse() {
            let params = {
                courseCode: this.courseCode,
                studentId: this.studentId,
            };
            classroomApi
                .join(params)
                .then((result) => {
                    if (result.code === 200) {
                        message.success("加入成功");
                    } else {
                        message.warning("找不到该课堂，请重试");
                    }
                })
                .catch((reason) => {
                    message.error("加入课堂出错了" + reason);
                });
        },
        historyRoomsList() {
            let params = {
                studentId: this.studentId,
            };
            classroomApi
                .historyList(params)
                .then((result) => {
                    this.historyRooms = result.data.historyRooms;
                })
                .catch((reason) => {
                    message.error("出错了:" + reason);
                });
        },
        NowRooms() {
            let params = {
                studentId: this.studentId,
            };
            classroomApi
                .list(params)
                .then((result) => {
                    this.rooms = result.data.rooms;
                    console.log(result);
                })
                .catch((reason) => {
                    message.error("出错了:" + reason);
                });
        },
        joinHistoryRoom(roomCode) {
            let params = {
                roomCode: roomCode,
                studentId: this.studentId,
            };
            classroomApi
                .joinHistoryRoom(params)
                .then((result) => {
                    if (result.code === 200) {
                        message.success("加入历史课堂成功");
                    } else {
                        message.warning("添加失败");
                    }
                })
                .catch((reason) => {
                    message.error("出错了:" + reason);
                });
        },
        exitRoom(roomCode){
            let params = {
                roomCode: roomCode,
                studentId: this.studentId,
            };
            classroomApi
                .exit(params)
                .then((result) => {
                    if (result.code === 200) {
                        message.success("退出课堂成功");
                    } else {
                        message.warning("退出失败");
                    }
                })
                .catch((reason) => {
                    message.error("出错了:" + reason);
                });
        },
        showModal(name) {
            if (name == "courseVisible") {
                this.courseVisible = true;
                this.historyRoomsList();
            } else {
                this.addCourseVisible = true;
            }
        },
        handleOk(name) {
            name == "courseVisible"
                ? (this.courseVisible = false)
                : (this.addCourseVisible = false);
        },
    },
    mounted() {
        this.NowRooms();
    },
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
[data-theme="dark"] .site-layout .site-layout-background {
    background: #141414;
}
</style>