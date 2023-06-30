import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { resolve } from "path"; // 配置别名

import { convertEnvType } from "./build/getEnv";
import { createPlugins } from "./build/getPlugins";

// mode 默认'development' 用于开发，'production' 用于构建
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  const viteEnv = convertEnvType(env);
  return {
    base: viteEnv.VITE_APP_API_BASE_URL, // 开发或生产环境服务的公共基础路径
    publicDir: "public", // 静态资源服务的文件夹
    plugins: createPlugins(viteEnv),
    // ↓解析配置
    resolve: {
      // ↓路径别名
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    // 开发服务器配置
    server: {
      // 指定服务器应该监听哪个 IP 地址。设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
      host: "0.0.0.0",
      // 指定开发服务器端口
      port: 8854,
      // 当端口被占用时设置不尝试下一个可用端口
      strictPort: true,
      // 开发服务器启动时，自动在浏览器中打开应用程序。 (number / string)
      open: true,
      // 为开发服务器配置自定义代理规则
      proxy: {
        "/api": {
          target: "http://jsonplaceholder.typicode.com",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, "")
        }
      }
    },
    // 构建选项
    build: {
      target: "es2020",
      // 用来指定使用哪种混淆器。
      minify: "terser",
      //自定义底层的 Rollup 打包配置。
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js", // 对代码分割中产生的 chunk 自定义命名
          entryFileNames: "js/[name]-[hash].js", // 用于指定 chunks 的入口文件模式
          assetFileNames: "[ext]/[name]-[hash].[ext]", // 自定义构建结果中的静态资源名称
          // 手动配置打包逻辑
          /*
          处理模块文件的引用关系:
            1. 定义每个模块文件，id为文件的全路径， 从rollup中观察到rollup对模块的定义
            2. 从入口配置文件出发，分析文件的引用关系，然后匹配output中的配置（这里直接指manualChunks）,重新构建引用关系。（这其中就是按规则构建新文件，更新引用）。
          */
          manualChunks(id) {
            // 打包依赖
            if (id.includes("node_modules")) {
              return "vendor";
            }
          }
        },
        //  告诉打包工具 在external配置的 都是外部依赖项  不需要打包,例如使用了 CDN 等
        external: []
      },
      // 传递给terser的选项
      terserOptions: {
        // 传递一个对象来指定自定义压缩选项
        compress: {
          // 生产环境时移除console
          drop_console: viteEnv.VITE_APP_DROP_DEBUG,
          drop_debugger: viteEnv.VITE_APP_DROP_CONSOLE
        }
      },
      // 指定输出路径(相对项目根目录)
      outDir: "dist",
      // 构建后是否生成 source map 文件
      sourcemap: false,
      //  启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      reportCompressedSize: true,
      // 规定触发警告的 chunk 大小。（以 kbs 为单位）默认值为500
      chunkSizeWarningLimit: 500
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`
        }
      }
    }
  };
});
