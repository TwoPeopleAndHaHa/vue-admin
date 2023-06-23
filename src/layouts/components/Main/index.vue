<template>
  <div id="layout_main">
    <el-main>
      <div class="card"><RouterView></RouterView></div>
    </el-main>
  </div>
</template>
<script setup lang="ts" name="layoutMain"></script>
<style lang="scss">
#layout_main {
  flex: 1;
  overflow: hidden;
  .el-main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 15px;
  }
}
</style>
