<template>
  <div class="title">
    <img src="@/assets/images/logo.png" alt="" />
    <h2>八两夫人</h2>
  </div>
  <el-form ref="loginFormRef" size="large" :rules="loginFormRules" :model="loginForm">
    <el-form-item prop="username">
      <el-input :placeholder="'user/admin'" v-model="loginForm.username">
        <template #prefix>
          <el-icon>
            <User />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" show-password autocomplete="new-password" :placeholder="'123456'" v-model="loginForm.password">
        <template #prefix>
          <el-icon>
            <Lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="code-item" prop="verificationCode">
      <el-input class="code-input" :placeholder="'请输入验证码'" v-model="loginForm.verificationCode">
        <template #prefix>
          <i :class="'iconfont icon-yanzhengyanzhengma'"></i>
        </template>
      </el-input>
      <div class="get-code" @click="refreshCode">
        <SIdentify :identifyCode="identifyCode"></SIdentify>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button class="reset-btn" size="large" :icon="CircleClose" @click="resetForm"> 重置 </el-button>
      <el-button
        class="login-btn"
        size="large"
        type="primary"
        :icon="UserFilled"
        @click="login(loginFormRef)"
        :loading="loginLoading"
      >
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup name="loginForm">
import { FormInstance, FormRules } from "element-plus";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import { GlobalStore } from "@/stores";
import { loginApi } from "@/api/modules/login";
import { Login } from "@/api/interface";

const router = useRouter();
const globalStore = GlobalStore();
const loginFormRef = ref<FormInstance>();
const loginLoading = ref(false);
const loginFormRules = reactive<FormRules>({
  username: { required: true, message: "请输入用户名", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
  verificationCode: [
    { required: true, message: "请输入验证码", trigger: ["blur", "change"] },
    {
      validator: (rule, value, callback) => {
        if (value && value.toLowerCase() !== identifyCode.value.toLowerCase()) {
          callback(new Error("验证码错误"));
        } else {
          callback();
        }
      },
      trigger: ["blur", "change"]
    }
  ]
});
const loginForm = reactive<Login.LoginForm>({
  username: "",
  password: "",
  verificationCode: ""
});

const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid, fields) => {
    if (!valid) return;
    loginLoading.value = true;
    try {
      const params = {
        username: loginForm.username,
        password: loginForm.password
      };
      const { data } = await loginApi(params);
      // !. ts的非空断言操作符
      globalStore.setToken(data!.token);
      globalStore.setUserName(loginForm.username);
      router.replace("/home");
    } catch (e) {
      console.log(e, "< ::e");
    } finally {
      loginLoading.value = false;
    }
  });
};

// 重置表单
const resetForm = () => {
  if (!loginFormRef.value || loginLoading.value) return;
  loginFormRef.value.resetFields();
};

// 随机验证码
const identifyCode = ref("");
const identifyCodes = ref("0123456789abcdwefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
const refreshCode = () => {
  identifyCode.value = "";
  makeCode(identifyCodes.value, 6);
};
function randomNum(min: number, max: number) {
  max = max + 1;
  return Math.floor(Math.random() * (max - min) + min);
}
function makeCode(data: string, len: number) {
  for (let i = 0; i < len; i++) {
    identifyCode.value += data[randomNum(0, data.length - 1)];
  }
}

onBeforeMount(() => {
  refreshCode();
});
onMounted(() => {
  // 监听回车事件
  document.onkeydown = (e: KeyboardEvent) => {
    (e.code === "Enter" || e.key === "Enter" || loginLoading.value) && login(loginFormRef.value);
  };
});
</script>
<style scoped lang="scss">
@import "./loginForm.scss";
</style>
