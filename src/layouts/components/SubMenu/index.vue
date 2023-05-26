<template>
  <div>
    <template v-for="item in menuList" :key="item.path">
      <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
        </template>
        <SubMenu :menuList="item.children" />
      </el-sub-menu>
      <el-menu-item v-else :index="item.path">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
      </el-menu-item>
    </template>
  </div>
</template>
<script setup lang="ts" name="asideMenu">
import { Document, Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue";
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
console.log("router ::>", router);
console.log("route ::>", route);
</script>
<style lang="less"></style>
