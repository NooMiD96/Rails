const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  let isDevBuild = true;
  let isShowInBrowser = false;
  if (env) {
    isDevBuild = !env.prod;
    isShowInBrowser = !!env.show;
  }

  let buildModeString = "development";
  let optimizationConfiguration = {
    minimize: !isDevBuild,
    splitChunks: {
      // the "all" doesn't work
      chunks: "async"
    },
  }
  if (!isDevBuild) {
    buildModeString = "production";
    optimizationConfiguration.minimizer = [
      new UglifyJsPlugin({ parallel: true })
    ];
  }
  optimizationConfiguration.nodeEnv = buildModeString

  // Configuration in common to both client-side and server-side bundles
  const sharedConfig = () => ({
    output: {
      filename: '[name].js',
      chunkFilename: '[name].bundle.js',
      publicPath: 'client/'
    },
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
      alias: {
        '@src': path.resolve('./src'),
        '@core': path.resolve('./src/core'),
        '@components': path.resolve('./src/components'),
        '@antdSvgs': path.resolve('./node_modules/@ant-design/icons/lib/outline'),
      },
    },
    // https://webpack.js.org/configuration/module/
    module: {
      rules: [
        // remove depence on icon which size >500Kb
        {
          test: /\.js$/,
          enforce: 'pre',
          use: StringReplacePlugin.replace({
            replacements: [{
              pattern: /import Icon from '\.\.\/icon';/ig,
              replacement: () => "import Icon from '@core/antd/Icon';"
            }]
          })
        },
        // https://webpack.js.org/loaders/url-loader/
        // https://webpack.js.org/loaders/file-loader/
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff)$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name].[ext]',
          },
        },
        // https://github.com/s-panferov/awesome-typescript-loader
        // TS module for webpack
        {
          test: /\.(ts|tsx)?$/,
          include: /src/,
          use: 'awesome-typescript-loader?silent=true'
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                minimize: !isDevBuild,
                sourceMap: isDevBuild
              }
            }
          ]
        },
      ]
    },
    plugins: [
      // https://github.com/s-panferov/awesome-typescript-loader
      // awesome-typescript-loader plugin
      // `CheckerPlugin` is optional. Use it if want async error reporting.
      new CheckerPlugin(),

      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

      // https://github.com/webpack-contrib/mini-css-extract-plugin
      // Concatenate css styles in file
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css",
        // filename: isDevBuild ? "[name].css" : "[name].[hash].css",
        // chunkFilename: isDevBuild ? "[id].css" : "[id].[hash].css"
      }),

      // an instance of the plugin must be present
      new StringReplacePlugin(),

      // hide warning in the webpack
      new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),

      // https://github.com/webpack-contrib/webpack-bundle-analyzer
      // new BundleAnalyzerPlugin({
      //   analyzerMode: 'static',
      //   openAnalyzer: isShowInBrowser,
      //   analyzerHost: "0.0.0.0",
      //   analyzerPort: 5500,
      // })
    ],
    optimization: optimizationConfiguration,
    mode: buildModeString,
    ...(isDevBuild
      ? { devtool: 'eval-source-map' }
      : {}
    )
  });

  // Configuration for client-side bundle suitable for running in browsers
  const clientBundleConfig = merge(sharedConfig(), {
    entry: {
      'main-client': './src/boot-client/boot-client.tsx'
    },
    output: {
      path: path.join(__dirname, './public/client')
    },
  });

  // Configuration for server-side (prerendering) bundle suitable for running in Node
  const serverBundleConfig = merge(sharedConfig(), {
    entry: {
      'main-server': './src/boot-server/boot-server.tsx',
    },
    output: {
      path: path.join(__dirname, './public/server'),
      libraryTarget: 'commonjs',
    },
    // https://webpack.js.org/configuration/resolve/#resolve-mainfields
    // Import only main from package
    resolve: {
      mainFields: ['main']
    },
    target: 'node',
  });

  return [clientBundleConfig, serverBundleConfig];
};