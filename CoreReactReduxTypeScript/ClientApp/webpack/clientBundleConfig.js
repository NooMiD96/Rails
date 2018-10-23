const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');

const AppSettings = require("../../appsettings.json");

const clientPlugins = (
  isShowInBrowser,
  fileNameTemplate
) => ([
  // https://github.com/webpack-contrib/mini-css-extract-plugin
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    filename: `${fileNameTemplate}.css`,
  }),

  // https://github.com/webpack-contrib/webpack-bundle-analyzer
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: isShowInBrowser,
    analyzerHost: "0.0.0.0",
    analyzerPort: 5500,
  }),

  // https://github.com/danethurber/webpack-manifest-plugin
  new ManifestPlugin({
    fileName: "manifest-assets.json",
    filter: (fileDescriptor) => fileDescriptor.name !== "service-worker.js"
  }),
]);

// Configuration for client-side bundle suitable for running in browsers
module.exports = getClientBundleConfig = (
  projectFolder,
  fileNameTemplate,
  isShowInBrowser,
  isDevBuild,
  sharedConfig
) => {
  const clientBundleConfig = merge(sharedConfig(), {
    entry: {
      [AppSettings.SpaClientFileName]: './src/boot-client/boot-client.tsx'
    },
    output: {
      filename: (chunkData) => (
        chunkData.chunk.name === 'service-worker'
          ? "[name].js"
          : `${fileNameTemplate}.js`
      ),
      chunkFilename: `${fileNameTemplate}.js`,
      publicPath: `${AppSettings.SpaPublicPath}/`,
      path: path.join(projectFolder, AppSettings.SpaPhysicalClientPath)
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          "react.redux": {
            chunks: 'all',
            // The all *react* and *redux* modules without "react-beautiful-dnd"
            // 'cause it is used only in TodoList component
            test: /[\\\/]node_modules[\\\/][^\\\/]*(react(?!-beautiful-dnd)|redux)[^\\\/]*[\\\/]/,
            priority: 2
          },
          "react.dnd": {
            chunks: 'all',
            test: /[\\\/]node_modules[\\\/][^\\\/]*react-beautiful-dnd[^\\\/]*[\\\/]/,
            priority: 2
          },
          antd: {
            chunks: 'all',
            test: /[\\\/]node_modules[\\\/][^\\\/]*(antd|ant-design)[^\\\/]*[\\\/]/,
            priority: 1,
          },
          rc: {
            chunks: 'all',
            // rc-[componentName] - used in the antd etc. components
            test: /[\\\/]node_modules[\\\/][^\\\/]*rc-[^\\\/]*[\\\/]/,
            priority: 1,
          }
        }
      }
    },
    plugins: clientPlugins(
      isShowInBrowser,
      fileNameTemplate
    ),
  });

  if (isDevBuild) {
    clientBundleConfig.plugins.push(
      // https://github.com/webpack-contrib/copy-webpack-plugin
      new CopyWebpackPlugin([{
        from: "src/sw.ts",
        to: 'service-worker.js',
      }])
    );
  } else {
    clientBundleConfig.entry['service-worker'] = './src/sw.ts';
  }

  return clientBundleConfig;
};
