const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const AppSettings = require("../../appsettings.json");

module.exports = getGeneralPlugins = () => [
  // https://github.com/s-panferov/awesome-typescript-loader
  // awesome-typescript-loader plugin
  // `CheckerPlugin` is optional. Use it if want async error reporting.
  new CheckerPlugin(),

  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

  // hide warning in the webpack
  new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),

  // https://webpack.js.org/guides/caching/#module-identifiers
  new webpack.HashedModuleIdsPlugin(),

  // https://webpack.js.org/plugins/environment-plugin
  // new webpack.EnvironmentPlugin({
  //   'PUBLIC_URL': AppSettings.SpaPublicPath
  // }),

  new VueLoaderPlugin(),

  // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
  new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', "window.jQuery": "jquery" }),

];
