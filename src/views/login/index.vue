<template>
  <div id="login">
    <div class="login_box">
      <SwitchDark />
      <div class="left_box">
        <img src="@/assets/images/login_left.svg" alt="" />
      </div>
      <div class="right_form">
        <LoginForm></LoginForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="login"></script>
<style scoped lang="scss">
@import "./index.scss";
</style>
