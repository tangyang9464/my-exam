<template>
    <a-card>
        <a-row :gutter="10">
            <a-col>
                <a-checkbox v-model:checked="checked">
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
    </a-card>
</template>

<script>
</script>

<style>
.radioStyle {
    display: block !important;
    margin-top: 20px !important;
}
</style>