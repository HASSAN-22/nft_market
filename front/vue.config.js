const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = {
  chainWebpack: config => {
    config.performance.maxEntrypointSize(7340032).maxAssetSize(7340032)

  },
  pwa: {
    name: 'آرا مووی',
    short_name  : 'آرا مووی',
    description: 'ارا مووی - مرجع دانلود فیلم و سریاب ایرانی و خارجی بدونه سانسور',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    start_url: ".",
    display: "standalone",
    background_color: "#000000",
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

  },
  transpileDependencies: true,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  }

}
