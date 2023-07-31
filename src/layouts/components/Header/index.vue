<template>
  <div id="layout_header">
    <el-header>
      <div class="toolbar flex_c_cb">
        <div class="bar_left">
          <el-icon @click="changMenu">
            <component :is="globalStore.systemConfig.isCollapse ? 'expand' : 'fold'"></component>
          </el-icon>
        </div>
        <div class="bar_right flex_cc">
          <!-- * 深色模式开关 -->
          <SwitchDark />
          <div class="bar-right-icons flex_cc"></div>
          <UserAvatar />
        </div>
      </div>
    </el-header>
  </div>
</template>
<script setup lang="ts" name="layoutHeader">
import { GlobalStore } from "@/stores/modules/global";

const globalStore = GlobalStore();
// 折叠菜单
const changMenu = () => {
  globalStore.setCollapse(!globalStore.systemConfig.isCollapse);
};
</script>
<style lang="scss">
.el-header {
  background-color: var(--el-bg-color);
  border-bottom: 1px solid #dcdfe6;
  line-height: 60px;
  text-align: center;
}
</style>
