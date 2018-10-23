const getAlias = require('./alias');
const getAssetsModuleRules = require('./assetsModuleRules');
const getJsModuleRules = require('./jsModuleRules');
const getGeneralPlugins = require('./generalPlugins');

// Configuration in common to both client-side and server-side bundles
module.exports = getSharedConfig = (
  optimizationConfiguration,
  buildModeString,
  devtool,
  fileNameTemplate
) => {
  const sharedConfig = {
    // https://webpack.js.org/configuration/stats/
    // Add built modules information
    stats: {
      modules: false,
      // children: false
    },
    // https://webpack.js.org/configuration/resolve/#resolve-extensions
    // Can import files without extansions
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: getAlias(),
    },
    // https://webpack.js.org/configuration/module/
    module: {
      rules: [
        ...getAssetsModuleRules(fileNameTemplate),
        ...getJsModuleRules(),
      ]
    },
    plugins: getGeneralPlugins(),
    optimization: optimizationConfiguration,
    mode: buildModeString,
  };

  if (devtool) {
    sharedConfig.devtool = devtool;
  }

  return sharedConfig;
};