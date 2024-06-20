import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { normalizePath } from "vite";
import autoprefixer from "autoprefixer";
import UnoCSS from "unocss/vite";

// 全局scss文件的路径
// 用normalizePath 解决window下的路径问题
const variablePath = normalizePath(path.resolve("./src/styles/variable.scss"));

// https://vitejs.dev/config/
export default defineConfig({
  // css相关的配置
  css: {
    modules: {
      //其中，name表示当前文件名，local表示类名
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个scss文件的开头自动注入
        additionalData: `@import "${variablePath}";`,
      },
    },
    // PostCSS配置
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 11",
            "last 2 versions",
          ],
          grid: true,
        }),
      ],
    },
  },
  plugins: [react(), UnoCSS()],
});
