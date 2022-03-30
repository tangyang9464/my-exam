<template>
    <a-config-provider :locale="locale">
        <a-layout style="min-height: 100vh;">
            <Sider></Sider>
            <router-view />
        </a-layout>
    </a-config-provider>
</template>

<script>
import Sider from '@/components/Sider.vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

export default {
	name: 'app',
	data() {
		return {
			locale: zhCN
		};
	},
	components: {
		Sider
	}
};
</script>

<style>
</style>
