const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
  const isDevBuild = !(env && env.prod);

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
        // {
        //   test: /\.css$/,
        //   enforce: 'pre',
        //   use: StringReplacePlugin.replace({
        //     replacements: [{
        //       pattern: /https:\/\/at.alicdn.com\/t\/(.*?\.)(svg|eot|ttf|woff)(#.*?)?'/ig,
        //       replacement: (match, p1, p2, p3, p4, p5, offset, string) =>
        //         `${path.resolve('./src/css').replace(/\\/g, '/')}/iconfont.${p2}${p3 ? p3 : ''}'`
        //     }]
        //   })
        // },
        {
          test: /\.css$/,
          // use: ExtractTextPlugin.extract({
          //   fallback: require.resolve('style-loader'),
          //   use: [{
          //     loader: require.resolve('css-loader'),
          //     options: { importLoaders: 1, minimize: !isDevBuild, sourceMap: isDevBuild }
          //   }]
          // }),
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: require.resolve('css-loader'),
              options: { importLoaders: 1, minimize: !isDevBuild, sourceMap: isDevBuild }
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

      // new webpack.optimize.CommonsChunkPlugin({
      //   children: true,
      //   async: true,
      // }),

      // new webpack.DefinePlugin({
      //   'process.env.NODE_ENV': isDevBuild
      //     ? '"development"'
      //     : '"production"'
      // }),

      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

      // https://github.com/webpack-contrib/extract-text-webpack-plugin
      // Load css styles in another file
      // Needed to load antd's css files
      // new ExtractTextPlugin({
      //   filename: '[name].css',
      //   allChunks: true,
      // }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css",

        // filename: isDevBuild ? "[name].css" : "[name].[hash].css",
        // chunkFilename: isDevBuild ? "[id].css" : "[id].[hash].css"
      }),

      // an instance of the plugin must be present
      // new StringReplacePlugin(),

      // hide warning in the webpack
      new webpack.NormalModuleReplacementPlugin(
        /\/iconv-loader$/, 'node-noop',
      ),
    ],
    optimization: {
      minimize: !isDevBuild,
      ...(
        isDevBuild
          ? {}
          : {
            minimizer: [
              new UglifyJsPlugin({
                parallel: true,
              })
            ]
          }
      ),
      splitChunks: {
        // "all" doesn't work
        chunks: "async"
      },
      nodeEnv: (
        isDevBuild
          ? "development"
          : "production"
      )
    },
    ...(
      isDevBuild
        ? { devtool: 'eval-source-map' }
        : {}
    ),
    mode: (
      isDevBuild
        ? "development"
        : "production"
    ),
  });

  // const pluginMap = isDevBuild
  //   ? [
  //     // Plugins that apply in development builds only
  //     new webpack.SourceMapDevToolPlugin({
  //       // Point sourcemap entries to the original file locations on disk
  //       moduleFilenameTemplate: path.relative('./public/client', '[resourcePath]')
  //     })
  //   ] : [
  //     // https://webpack.js.org/guides/migrating/#uglifyjsplugin-sourcemap
  //     // Plugins that apply in production builds only
  //     new webpack.optimize.UglifyJsPlugin({
  //       parallel: true,
  //     })
  //   ]

  // Configuration for client-side bundle suitable for running in browsers
  const clientBundleConfig = merge(sharedConfig(), {
    entry: {
      'main-client': './src/boot-client/boot-client.tsx'
    },
    output: {
      path: path.join(__dirname, './public/client')
    },
    // plugins: pluginMap,
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
    // plugins: pluginMap,
    target: 'node',
  });

  return [clientBundleConfig, serverBundleConfig];
};