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
                        试卷信息 (共1题,满分1分)
                    </a-col>

                    <a-col>
                        <a-button type="primary" @click="showModal">
                            <template #icon>
                                <PlusOutlined />
                            </template>
                            添加习题
                        </a-button>

                        <a-modal centered="true" v-model:visible="visible" title="添加习题" @ok="handleOk" :width="1000" ok-text="确认" cancel-text="取消">
                            <a-row type="flex" :gutter="[10,20]" id="flexbox" class="my-scroll">
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

            <a-card>
                <a-checkbox-group v-model:value="checkedList">
                    <a-row :gutter="10">
                        <a-col>
                            <a-checkbox :value="1">
                                2-1
                            </a-checkbox>
                        </a-col>
                        <a-col style="max-width: 800px;">
                            <div>顺序存储结构中数据中数据元素之间逻辑关系是由（ ）表示的。
                                顺序存储结构中数据中数据元素之间逻辑关系是由（ ）表示的。
                                顺序存储结构中数据中数据元素之间逻辑关系是由（ ）表示的。
                                顺序存储结构中数据中数据元素之间逻辑关系是由（ ）表示的。
                            </div>
                            <!-- 选择题 -->
                            <a-radio-group v-model:value="value" v-if="false">
                                <a-radio class="radioStyle" :value="1">Option A</a-radio>
                                <a-radio class="radioStyle" :value="2">Option B</a-radio>
                                <a-radio class="radioStyle" :value="3">Option C</a-radio>
                                <a-radio class="radioStyle" :value="3">Option D</a-radio>
                            </a-radio-group>
                            <!-- 判断题 -->
                            <a-radio-group v-model:value="value" v-if="true">
                                <a-radio class="radioStyle" :value="1">T</a-radio>
                                <a-radio class="radioStyle" :value="2">F</a-radio>
                            </a-radio-group>
                        </a-col>
                        <a-col>
                            <div>
                                (3分)
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="10">
                        <a-col>
                            <a-checkbox :value="2">
                                2-1
                            </a-checkbox>
                        </a-col>
                        <a-col style="max-width: 800px;">
                            <div>顺序存储结构中数据中数据元素之间逻辑关系是由（ ）表示的。
                                顺序存储结构中数据中数据元素之间逻辑关系是由（ ）表示的。
                                顺序存储结构中数据中数据元素之间逻辑关系是由（ ）表示的。
                                顺序存储结构中数据中数据元素之间逻辑关系是由（ ）表示的。
                            </div>
                            <!-- 选择题 -->
                            <a-radio-group v-model:value="value" v-if="false">
                                <a-radio class="radioStyle" :value="1">Option A</a-radio>
                                <a-radio class="radioStyle" :value="2">Option B</a-radio>
                                <a-radio class="radioStyle" :value="3">Option C</a-radio>
                                <a-radio class="radioStyle" :value="3">Option D</a-radio>
                            </a-radio-group>
                            <!-- 判断题 -->
                            <a-radio-group v-model:value="value" v-if="true">
                                <a-radio class="radioStyle" :value="1">T</a-radio>
                                <a-radio class="radioStyle" :value="2">F</a-radio>
                            </a-radio-group>
                        </a-col>
                        <a-col>
                            <div>
                                (3分)
                            </div>
                        </a-col>
                    </a-row>
                </a-checkbox-group>
            </a-card>
        </a-layout-content>
    </a-layout>
</template>

<script>
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref, reactive, toRefs, watch } from "vue";
import TinymceEditor from "@/components/TinymceEditor.vue";

export default defineComponent({
    setup() {
        const visible = ref(false);
        const state = reactive({
            indeterminate: false,
            checkAll: false,
            checkedList: [],
        });

        const onCheckAllChange = (e) => {
            Object.assign(state, {
                checkedList: e.target.checked ? [1, 2] : [],
                indeterminate: false,
            });
        };

        watch(
            () => state.checkedList,
            (val) => {
                console.log(val);
                state.indeterminate = !!val.length && val.length < 2;
                state.checkAll = val.length === 2;
            }
        );

        const showModal = () => {
            visible.value = true;
        };

        const handleOk = (e) => {
            console.log(e);
            visible.value = false;
        };

        return {
            visible,
            ...toRefs(state),
            onCheckAllChange,
            showModal,
            handleOk,
        };
    },
    components: {
        PlusOutlined,
        DeleteOutlined,
        TinymceEditor,
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
.my-scroll {
    height: 450px;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>