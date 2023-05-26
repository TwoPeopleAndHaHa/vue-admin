<template>
  <svg aria-hidden="true" :style="{ width, height }">
    <use :xlink:href="prefix + name" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
// 接受父组件传递过来的参数
defineProps({
  prefix: {
    type: String,
    default: "#icon-"
  },
  color: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    require: true
  },
  width: {
    type: String,
    default: "16px"
  },
  height: {
    type: String,
    default: "16px"
  }
});
</script>
