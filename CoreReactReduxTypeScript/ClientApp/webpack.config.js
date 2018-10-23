const getStartupValues = require('./webpack/startupValues');
const getSharedConfig = require('./webpack/shareConfig');
const getServerBundleConfig = require('./webpack/serverBundleConfig');
const getClientBundleConfig = require('./webpack/clientBundleConfig');

module.exports = (env) => {
  const {
    projectFolder,
    isDevBuild,
    isShowInBrowser,
    fileNameTemplate,
    buildModeString,
    optimizationConfiguration,
  } = getStartupValues(env, __dirname);

  const shareConfigFunc = () => getSharedConfig(
    optimizationConfiguration,
    buildModeString,
    isDevBuild ? 'eval-source-map' : '',
    fileNameTemplate
  );

  const serverBundleConfig = getServerBundleConfig(
    projectFolder,
    shareConfigFunc
  );

  const clientBundleConfig = getClientBundleConfig(
    projectFolder,
    fileNameTemplate,
    isShowInBrowser,
    isDevBuild,
    shareConfigFunc
  )


  return [clientBundleConfig, serverBundleConfig];
};