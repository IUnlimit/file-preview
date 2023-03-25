import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { prismjsPlugin } from "vite-plugin-prismjs";
import esbuild from "rollup-plugin-esbuild";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    prismjsPlugin({
      languages: "all",
      plugins: [
        "line-numbers",
        "toolbar",
        "show-language",
        "copy-to-clipboard",
      ],
      theme: "coy",
      css: true,
    }),
    // 打包前兼容实现
    esbuild({
      target: "chrome64",
      loaders: {
        ".vue": "js",
        ".ts": "js",
      },
    }),
    // 打包后兼容实现
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  // resolve: {
  //   alias: {
  //     "@": resolve("src"),
  //     comps: resolve("src/components"),
  //     api: resolve("src/api"),
  //     views: resolve("src/views"),
  //     utils: resolve("src/utils"),
  //     router: resolve("src/router"),
  //   },
  // },
  base: "./", // build file relative path
  server: {
    port: 5137,
    open: true,
    cors: true,
  },
});
