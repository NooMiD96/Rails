const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const path = require('path');

const AppSettings = require("../../appsettings.json");

const serverPlugins = () => [
  // https://github.com/webpack-contrib/mini-css-extract-plugin
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    filename: `[name].css`,
  }),
];

// Configuration for server-side (prerendering) bundle suitable for running in Node
module.exports = getServerBundleConfig = (
  projectFolder,
  sharedConfig
) => {
  const serverBundleConfig = merge(sharedConfig(), {
    entry: {
      [AppSettings.SpaServerFileName]: './src/boot-server/boot-server.tsx',
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.join(projectFolder, AppSettings.SpaPhysicalServerPath),
      libraryTarget: 'commonjs',
    },
    // https://webpack.js.org/configuration/resolve/#resolve-mainfields
    // Import only main from package
    resolve: {
      mainFields: ['main']
    },
    optimization: {
      splitChunks: {
        chunks: "async",
      }
    },
    target: 'node',
    plugins: serverPlugins(),
  });

  return serverBundleConfig;
}