<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
        <el-tab-pane v-for="item in tabsMenuList" :key="item.path" :label="item.title" :name="item.path" :closable="item.close">
          <template #label>
            <el-icon v-show="item.icon && tabsIcon" class="tabs-icon">
              <component :is="item.icon"></component>
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts" name="layoutTabs">
import type { TabsPaneContext, TabPaneName } from "element-plus";
import { GlobalStore } from "@/stores/modules/global";
import { useTabsStore } from "@/stores/modules/tabs";

const route = useRoute();
const router = useRouter();
const tabStore = useTabsStore();
const globalStore = GlobalStore();
const tabsMenuValue = ref(route.fullPath);
const tabsMenuList = computed(() => tabStore.tabsMenuList);
const tabsIcon = computed(() => globalStore.tabsIcon);

watch(
  () => route.fullPath,
  () => {
    if (route.meta.isFull) return;
    tabsMenuValue.value = route.fullPath;
    const tabsParams = {
      icon: route.meta.icon as string,
      title: route.meta.title as string,
      path: route.fullPath,
      name: route.name as string,
      close: !route.meta.isAffix
    };
    tabStore.addTabs(tabsParams);
  },
  { immediate: true }
);

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

// Tab Click
const tabClick = (tabItem: TabsPaneContext) => {
  const fullPath = tabItem.props.name as string;
  router.push(fullPath);
};
// Remove Tab
const tabRemove = (fullPath: TabPaneName) => {
  const name = tabStore.tabsMenuList.filter(item => item.path == fullPath)[0].name || "";
  // keepAliveStore.removeKeepAliveName(name);
  tabStore.removeTabs(fullPath as string, fullPath == route.fullPath);
};
</script>

<style scoped lang="scss">
.tabs-box {
  background-color: var(--el-bg-color);
  .tabs-menu {
    position: relative;
    width: 100%;
    .el-dropdown {
      position: absolute;
      top: 8px;
      right: 13px;
    }
    :deep(.el-tabs) {
      .el-tabs__header {
        box-sizing: border-box;
        height: 40px;
        padding: 0 10px;
        margin: 0;
        .el-tabs__nav-wrap {
          position: absolute;
          width: calc(100% - 110px);
          .el-tabs__nav {
            display: flex;
            border: none;
            .el-tabs__item {
              display: flex;
              align-items: center;
              justify-content: center;
              color: #afafaf;
              border: none;
              .tabs-icon {
                margin: 1.5px 4px 0 0;
                font-size: 15px;
              }
              .is-icon-close {
                margin-top: 1px;
              }
              &.is-active {
                color: var(--el-color-primary);
                &::before {
                  position: absolute;
                  bottom: 0;
                  width: 100%;
                  height: 0;
                  content: "";
                  border-bottom: 2px solid var(--el-color-primary) !important;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
