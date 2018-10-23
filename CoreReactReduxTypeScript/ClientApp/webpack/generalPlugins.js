const StringReplacePlugin = require('string-replace-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const webpack = require('webpack');

const AppSettings = require("../../appsettings.json");

module.exports = getGeneralPlugins = () => [
  // https://github.com/s-panferov/awesome-typescript-loader
  // awesome-typescript-loader plugin
  // `CheckerPlugin` is optional. Use it if want async error reporting.
  new CheckerPlugin(),

  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

  // an instance of the plugin must be present
  new StringReplacePlugin(),

  // hide warning in the webpack
  new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),

  // https://webpack.js.org/guides/caching/#module-identifiers
  new webpack.HashedModuleIdsPlugin(),

  // https://webpack.js.org/plugins/environment-plugin
  new webpack.EnvironmentPlugin({
    'PUBLIC_URL': AppSettings.SpaPublicPath
  }),
];