<template>
    <a-layout style="min-height: 100vh">
        <a-layout>
            <a-layout-header class="my-header">
                操作系统考试 2020-20902022
            </a-layout-header>

            <a-layout-content style="padding:0 25px">
                <a-row :gutter="20">
                    <a-col :span="10">
                        <a-card title="完成情况">
                            <a-row type="flex" justify="space-around" align="middle">
                                <a-col :span="24" style="text-align: center;margin-bottom:40px">
                                    <a-progress type="circle" :percent="75" />
                                </a-col>

                                <a-col :span="7" style="text-align: center;">
                                    <a-typography-text style="font-size:17px;" class="my-dot-left" >已完成: 0人</a-typography-text>
                                </a-col>

                                <a-col :span="7" style="text-align: center;">
                                    <a-typography-text style="font-size:17px" class="my-dot-mid">进行中: 0人</a-typography-text>
                                </a-col>

                                <a-col :span="7" style="text-align: center;">
                                    <a-typography-text style="font-size:17px" class="my-dot-right">未开始: 0人</a-typography-text>
                                </a-col>
                            </a-row>

                            <a-row type="flex" justify="space-around" align="middle" style="margin-top:50px">
                                <a-col :span="24" style="text-align: center;margin-bottom:15px">
                                    <a-button type="primary" size="large">查看试卷</a-button>
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                    <a-col :span="10">
                        <a-card>
                            <div>
                                <a-progress type="circle" :percent="75" :format="percent => `${percent} Days`" />
                                <a-progress type="circle" :percent="100" :format="() => 'Done'" />
                                <a-progress type="circle" :percent="75">
                                    <template #format="percent">
                                        <span style="color: red">{{ percent }}</span>
                                    </template>
                                </a-progress>
                            </div>
                        </a-card>
                    </a-col>
                </a-row>

            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
export default {
    components: {},
    setup() {},
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
.my-dot-left::before {
    content: "";
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #52c41a;
    margin-right: 10px;
}
.my-dot-mid::before {
    content: "";
    display: inline-block;
    width: 12px;
    height: 12px;
    background-color: #a6cafa;
    border-radius: 50%;
    margin-right: 10px;
}
.my-dot-right::before {
    content: "";
    display: inline-block;
    width: 12px;
    height: 12px;
    background-color: #e7e7e7;
    border-radius: 50%;
    margin-right: 10px;
}
</style>