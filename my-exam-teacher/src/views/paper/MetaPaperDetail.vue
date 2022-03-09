<template>
    <a-layout style="min-height: 100vh">
        <a-layout-header class="my-header">
            <a-row type="flex" justify="space-between">
                <a-col>
                    <a-typography-paragraph v-model:content="editableStr" editable>
                        <span style="font-weight: 600;font-size:18px">
                            试卷名称
                        </span>
                    </a-typography-paragraph>
                </a-col>

                <a-col>
                    <a-button type="primary" size="small">保存</a-button>
                    &nbsp;&nbsp;
                    <a-button size="small">取消</a-button>
                </a-col>
            </a-row>
        </a-layout-header>

        <a-layout-content style="padding:0 25px">
            <a-card>
                <a-row type="flex" :gutter="50">
                    <a-col>
                        试卷信息 (共1题，满分1分)
                    </a-col>

                    <a-col>
                        <a-button type="primary" @click="showModal">
                            <template #icon>
                                <PlusOutlined />
                            </template>
                            添加习题
                        </a-button>

                        <a-modal v-model:visible="visible" title="添加习题" @ok="handleOk" :width="1000" ok-text="确认" cancel-text="取消">
                            <a-row type="flex" :gutter="[10,20]" id="flexbox">
                                <a-col :span="2">
                                    <div>题型</div>
                                </a-col>
                                <a-col :span="22">
                                    <a-select ref="select" v-model:value="value1" @focus="focus" @change="handleChange" style="width:200px">
                                        <a-select-option value="单选">单选</a-select-option>
                                        <a-select-option value="多选">多选</a-select-option>
                                        <a-select-option value="判断">判断</a-select-option>
                                        <a-select-option value="填空">填空</a-select-option>
                                        <a-select-option value="主观">主观</a-select-option>
                                    </a-select>
                                </a-col>

                                <a-col :span="2">
                                    <div>题干</div>
                                </a-col>
                                <a-col :span="22">
                                    <TinymceEditor />
                                </a-col>

                                <a-col :span="2">
                                    <div>选项A</div>
                                </a-col>
                                <a-col :span="22">
                                    <TinymceEditor />
                                </a-col>

                                <a-col :span="2">
                                    <div>本题分值</div>
                                </a-col>
                                <a-col :span="22">
                                    <a-input-number v-model:value="value" :min="0" :max="10" :step="0.1" style="width:200px;height:40px" />
                                </a-col>
                            </a-row>
                        </a-modal>
                    </a-col>
                </a-row>
            </a-card>
            <a-card>
                <a-row type="flex" :gutter="50">
                    <a-col>
                        <a-checkbox v-model:checked="checkAll" :indeterminate="indeterminate" @change="onCheckAllChange">
                            全选
                        </a-checkbox>
                    </a-col>

                    <a-col>
                        <DeleteOutlined />&nbsp;
                        <span>删除</span>
                    </a-col>
                </a-row>
            </a-card>

            <ChoiceType />
            <ChoiceType />
            <ChoiceType />
            <ChoiceType />
        </a-layout-content>
    </a-layout>
</template>

<script>
import {
    PlusOutlined,
    DeleteOutlined,
    FormOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import ChoiceType from "@/views/paper/questions/ChoiceType.vue";
import TinymceEditor from "@/components/TinymceEditor.vue";

export default defineComponent({
    setup() {
        const visible = ref(false);

        const showModal = () => {
            visible.value = true;
        };

        const handleOk = (e) => {
            console.log(e);
            visible.value = false;
        };

        return {
            visible,
            showModal,
            handleOk,
        };
    },
    components: {
        ChoiceType,
        PlusOutlined,
        DeleteOutlined,
        FormOutlined,
        TinymceEditor,
    },

    data() {
        return {};
    },
});
</script>

<style>
.test {
    background-color: lime;
    flex: 1 1 auto;
    width: 100px;
    height: 50px;
}
.my-header {
    background-color: #fff !important;
    margin-bottom: 10px !important;
    height: 44px !important;
    line-height: 44px !important;
}
</style>