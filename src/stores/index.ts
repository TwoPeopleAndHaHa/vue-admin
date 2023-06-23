import { createPinia, defineStore } from "pinia";
import { GlobalState } from "./interface";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; // 持久化

export const GlobalStore = defineStore("GlobalState", {
  state: (): GlobalState => ({
    token: "",
    userName: "",
    systemConfig: {
      isCollapse: false,
      isDark: false
    }
  }),
  getters: {},
  actions: {
    setCollapse(val: boolean) {
      this.systemConfig.isCollapse = val;
    },
    setTheme(val: boolean) {
      this.systemConfig.isDark = val;
    },
    setToken(token: string) {
      this.token = token;
    },
    setUserName(name: string) {
      this.userName = name;
    },
    // 初始化
    resetInit() {
      this.token = "";
      this.userName = "";
      // this.language = "";
      // this.isFollowSystem = true; //是否开启跟随系统主题
      this.systemConfig = {
        isCollapse: false,
        isDark: this.systemConfig.isDark
      };
    }
  },
  persist: {
    key: "GlobalState", // 持久化存入的key
    storage: localStorage // 持久化方式
  }
});
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export default pinia;
