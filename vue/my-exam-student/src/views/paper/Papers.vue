<template>
    <a-layout style="min-height: 100vh">
        <a-layout>
            <a-layout-header class="my-header" />
            <a-layout-content style="padding:0 25px">
                <a-row type="flex" :gutter="20">
                    <a-col>
                        <router-link to="/paperDetail/1">
                            <a-card hoverable style="width: 300px;margin-bottom: 50px;">
                                    <div class="my-text-center">
                                        <a-typography-title :level="4">操作系统</a-typography-title>
                                    </div>

                                    <div class="my-text-center">
                                        <a-typography-text type="secondary">满分：</a-typography-text>
                                        <a-typography-text type="secondary">10分</a-typography-text>
                                    </div>

                                   <div class="my-text-center">
                                        <a-typography-text type="secondary">共9题</a-typography-text>
                                    </div>
                             
                                   <div class="my-text-center">
                                        <a-typography-text type="secondary">限时：10分</a-typography-text>
                                    </div>

                                    <div class="my-text-center">
                                        <a-typography-text type="secondary">截止时间：2020-12-26/12:00/周六</a-typography-text>
                                    </div>
                                
                                    <div class="my-text-center">
                                        <a-typography-text type="secondary">得分：</a-typography-text>
                                        <a-typography-text type="success" style="font-size:19px;">100</a-typography-text>
                                    </div>
                                
                                    <div class="my-text-center">
                                        <a-button type="primary">开始答题</a-button>
                                    </div>
                            </a-card>
                        </router-link>
                    </a-col>
                </a-row>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
import {
    
} from "@ant-design/icons-vue";
import { defineComponent } from "vue";

export default defineComponent({
    components: {
      
    },

    data() {
        return {

        };
    },
});
</script>
<style>
.my-header {
    background-color: #fff !important;
    margin-bottom: 10px !important;
    height: 44px !important;
    line-height: 44px !important;
}
.my-text-center{
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
[data-theme="dark"] .site-layout .site-layout-background {
    background: #141414;
}
</style>