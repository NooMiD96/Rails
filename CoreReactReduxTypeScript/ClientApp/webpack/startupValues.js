const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = getStartupValues = (env, dirname) => {
  const projectFolder = path.join(dirname, '../');
  let isDevBuild = true;
  let isShowInBrowser = false;
  if (env) {
    isDevBuild = !env.prod;
    isShowInBrowser = !!env.show;
  }

  const fileNameTemplate = isDevBuild
    ? '[name]'
    : '[name].[contenthash]';

  let buildModeString = "development";
  let optimizationConfiguration = {
    minimize: !isDevBuild,
    splitChunks: {
      automaticNameDelimiter: '.',
      maxInitialRequests: Infinity,
      minSize: 0,
      name: true,
    },
  }
  if (!isDevBuild) {
    buildModeString = "production";
    optimizationConfiguration.minimizer = [
      new UglifyJsPlugin({ parallel: true }),
      new OptimizeCSSAssetsPlugin({})
    ];
  }
  optimizationConfiguration.nodeEnv = buildModeString;

  return {
    projectFolder,
    isDevBuild,
    isShowInBrowser,
    fileNameTemplate,
    buildModeString,
    optimizationConfiguration,
  };
};
