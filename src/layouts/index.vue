<template>
  <el-container class="layout_wrap">
    <!-- 左侧菜单 -->
    <el-aside width="240px">
      <div class="aside_logo">
        <div class="logo_wrap">
          <img src="../assets/images/monster.jpg" alt="" />
          <h1>半斤八两</h1>
        </div>
      </div>
      <el-menu default-active="1" router unique-opened>
        <SubMenu :menuList="menuList.menuRoutes"></SubMenu>
      </el-menu>
    </el-aside>
    <!-- 右侧内容展示 -->
    <el-container class="layout_container">
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup name="layout">
import Header from "@/layouts/components/Header/index.vue";
import Main from "@/layouts/components/Main/index.vue";
import Footer from "@/layouts/components/Footer/index.vue";
import useUserStore from "@/stores/modules/user";
const menuList = useUserStore();
</script>

<style lang="less">
.layout_wrap {
  width: 100%;
  height: 100%;
  .el-menu {
    border-right: 0;
  }
  .el-aside {
    height: 100%;
    background-color: #fff;
    border-right: 1px solid #dcdfe6;
    .aside_logo {
      width: 100%;
      height: 60px;
      // background-color: #000;
      .logo_wrap {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        img {
          height: 50%;
          width: 13%;
          border-radius: 30%;
        }
        h1 {
          font-size: 20px;
          margin: 0 10px;
        }
      }
    }
  }
}
.layout_container {
  flex-direction: column;
}
</style>
