<template>
    <a-layout style="min-height: 100vh;">
        <Sider></Sider>

        <router-view></router-view>
    </a-layout>
</template>

<script>
import Sider from "@/components/Sider.vue";

export default {
    name: "app",
    data() {
        return {};
    },
    components: {
      Sider,
    },
};
</script>

<style>
</style>
