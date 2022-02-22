<template>
    <a-card hoverable style="width: 300px;margin-bottom: 50px;">
        <a-row type="flex" justify="space-between" align="middle" style="margin-bottom: 50px;">
            <a-col>
                <a-typography-title :level="3">操作系统</a-typography-title>
            </a-col>
            <a-col>
                <ellipsis-outlined key="ellipsis" :style="{ fontSize: '25px' }" />
            </a-col>
        </a-row>
        <a-row type="flex" justify="space-between" align="middle">
            <a-col>
                <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <span>王小明</span>
            </a-col>
            <a-col>
                <HomeOutlined />
                <a-typography-text>183班级</a-typography-text>
            </a-col>
        </a-row>
    </a-card>
</template>
<script>
import { SettingOutlined, EditOutlined, EllipsisOutlined, HomeOutlined,HomeTwoTone } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
    HomeOutlined,
    HomeTwoTone
  },
});
</script>