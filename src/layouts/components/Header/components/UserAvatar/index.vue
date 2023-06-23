<template>
  <div class="user-name">{{ globalStore.userName }}</div>
  <el-dropdown class="user-photo" trigger="click" @command="handleCommand">
    <el-avatar :size="40" src="" @error="() => true">
      <img src="@/assets/images/monster.jpg" alt="" />
    </el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="1">
          <el-icon><User /></el-icon>{{ "个人资料" }}</el-dropdown-item
        >
        <el-dropdown-item command="2"
          ><el-icon><Edit /></el-icon>{{ "编辑信息" }}</el-dropdown-item
        >
        <el-dropdown-item command="3" divided
          ><el-icon><SwitchButton /></el-icon>{{ "退出登录" }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="user">
import { ElMessage, ElMessageBox } from "element-plus";
import { GlobalStore } from "@/stores";
import { logoutApi } from "@/api/modules/login";

const globalStore = GlobalStore();
const router = useRouter();

const handleCommand = (command: string | number | object) => {
  if (command === "3") {
    logout();
  } else {
    ElMessage.success("暂未开放");
  }
};
// 退出登录
const logout = () => {
  ElMessageBox.confirm("确定退出登录么?", "温馨提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      await logoutApi();
      globalStore.resetInit();
      router.replace("/login");
    })
    .catch(() => {
      console.log("< ::取消退出");
    });
};
</script>

<style scoped lang="scss">
.user-name {
  display: inline-block;
  max-width: 50px;
  margin: 0 5px 0 10px;
  overflow: hidden;
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
}
.user-photo {
  cursor: pointer;
}
:deep(.el-dropdown-menu__item) {
  justify-content: center;
}
</style>
