<template>
  <div>
    <template v-for="item in menuList" :key="item.path">
      <!-- 没有子路由 -->
      <template v-if="!item.children">
        <el-menu-item v-if="!item.meta.isHidden" :index="item.path">
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <template #title>
            <span> {{ item.meta.title }} </span>
          </template>
        </el-menu-item>
      </template>

      <!-- 只有一个子路由 -->
      <template v-if="item.children && item.children.length == 1">
        <el-menu-item v-if="!item.children[0].meta.isHidden" :index="item.children[0].path">
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span> {{ item.children[0].meta.title }} </span>
        </el-menu-item>
      </template>

      <!-- 有多个子路由 -->
      <template v-if="item.children && item.children.length > 0">
        <el-sub-menu v-if="!item.meta.isHidden" :index="item.path">
          <template #title>
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <SubMenu :menuList="item.children" />
        </el-sub-menu>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts" name="SubMenu">
// * menu 菜单
declare namespace Menu {
  interface MenuOptions {
    path: string;
    name: string;
    meta: MetaProps;
    component?: string | (() => Promise<unknown>);
    redirect?: string;
    children?: MenuOptions[];
  }
  interface MetaProps {
    icon: string;
    title: string;
    // activeMenu?: string;
    // isLink?: string;
    isHidden: boolean;
    // isFull: boolean;
    // isAffix: boolean;
    // isKeepAlive: boolean;
  }
}

defineProps({
  menuList: {
    type: Array<Menu.MenuOptions>,
    require: true
  }
});
</script>
<style lang="less"></style>
