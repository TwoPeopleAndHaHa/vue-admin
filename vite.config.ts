import { fileURLToPath, URL } from "node:url";
import path from "path";
// svg 插件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]"
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)) // 相对路径别名配置 , 使用 @ 代替 src
    }
  },
  css: {
    preprocessorOptions: {
      javascriptEnabled: true,
      additionalData: `@import "${path.resolve(__dirname, "src/assets/less/frame.less")}";`
    }
  }
});
