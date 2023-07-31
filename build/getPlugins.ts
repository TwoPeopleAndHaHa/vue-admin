import vue from "@vitejs/plugin-vue"; // 处理.vue后缀的Vue单文件组件
import { type PluginOption } from "vite";
// 官方推荐自动引入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// mock
import { viteMockServe } from "vite-plugin-mock";
// 静态打包优化
import viteCompression from "vite-plugin-compression";
export const createPlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
  return [
    vue(),
    // 自动引入
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue", "vue-router", "vue-i18n"],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      resolvers: [ElementPlusResolver()],
      vueTemplate: true, // 是否在 vue 模板中自动导入
      dts: true // 配置文件生成位置
    }),
    // 组件自动注册
    Components({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      // 只要项目中，在components目录下的文件，会自动导入到components.d.ts中，这样，页面或者组件中就不用再次引入了，也无需在`main.js`通过app.component全局注册了
      dirs: ["src/components", "src/**/components"],
      extensions: ["vue", "jsx", "tsx", "ts", "js"],
      resolvers: [ElementPlusResolver()],
      dts: true // 配置文件生成位置
    }),
    // mock 数据
    viteMockServe({
      // 踩坑点 一定要使用相对路径
      mockPath: "./src/mock", // 设置模拟.ts 文件的存储文件夹
      enable: true, // 是否启用 mock 功能
      // 关闭监听文件内容更改 , vite-plugin-mock 3.0版本有bug尚未解决  https://github.com/vbenjs/vite-plugin-mock/issues/98
      watchFiles: false
    }),
    // 静态打包
    viteCompression({
      // 是否控制台输出压缩结果
      verbose: true,
      // 体积大于多少会被压缩 ( 单位b)
      threshold: 1024,
      // 压缩算法 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      algorithm: "gzip",
      // 生成的压缩包后缀
      ext: "-gz",
      // 对应压缩算法的参数
      compressionOptions: {},
      // 压缩后时候删除源文件
      deleteOriginFile: true
    })
  ];
};
