<template>
  <div id="layout_main">
    <el-main>
      <div class="card">
        <RouterView></RouterView>
      </div>
    </el-main>
  </div>
</template>
<script setup lang="ts" name="layoutMain">
import { ref } from "vue";
import HomeMain from "@/views/home/index.vue";
const item = {
  date: "2016-05-02",
  name: "Tom",
  address: "No. 189, Grove St, Los Angeles"
};
const tableData = ref(Array.from({ length: 20 }).fill(item));
</script>
<style lang="less">
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
