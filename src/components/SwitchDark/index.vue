<template>
  <el-switch
    v-model="isDark"
    style="margin: 0 20px"
    inline-prompt
    :active-icon="Sunny"
    :inactive-icon="Moon"
    @change="changTheme"
  />
</template>

<script setup lang="ts">
import { Sunny, Moon } from "@element-plus/icons-vue";
import { GlobalStore } from "@/stores/modules/global";
import { useTheme } from "@/hooks/useTheme";

const isDark = ref(false);
const globalStore = GlobalStore();
watch(
  () => globalStore.systemConfig.isDark,
  (val: boolean) => {
    isDark.value = val;
  },
  { immediate: true }
);
const { switchDark } = useTheme();
const changTheme = () => {
  globalStore.setTheme(isDark.value);
  switchDark();
};
</script>

<style scoped lang="scss"></style>
