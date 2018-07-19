const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const merge = require('webpack-merge');

module.exports = (env) => {
  const isDevBuild = !(env && env.prod);

  // Configuration in common to both client-side and server-side bundles
  const sharedConfig = () => ({
    output: {
      filename: '[name].js',
      chunkFilename: '[name].bundle.js',
      publicPath: isDevBuild
        ? 'public/'
        : 'client/'
    },
    //https://webpack.js.org/configuration/stats/
    // Add built modules information
    stats: {
      modules: false
    },
    //https://webpack.js.org/configuration/resolve/#resolve-extensions
    //can import files without extansions
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@src': path.resolve('./src'),
        '@core': path.resolve('./src/core'),
        '@components': path.resolve('./src/components'),
      },
    },
    //https://webpack.js.org/configuration/module/
    module: {
      rules: [
        //https://github.com/s-panferov/awesome-typescript-loader
        //TS module for webpack
        { test: /\.tsx?$/, include: /src/, use: 'awesome-typescript-loader?silent=true' },
        //https://webpack.js.org/loaders/url-loader/
        //looks like need install, need check
        { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: require.resolve('style-loader'),
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  minimize: !isDevBuild,
                  sourceMap: isDevBuild,
                }
              },
            ]
          })
        },
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        children: true,
        async: true,
      }),
      new CheckerPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': isDevBuild
          ? '"development"'
          : '"production"'
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      //https://github.com/webpack-contrib/extract-text-webpack-plugin
      //load css styles in another file
      //needed to load antd's css files
      new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true,
      })
    ],
    ...(
      isDevBuild
        ? { devtool: 'eval-source-map' }
        : {}
    )
  });

  const pluginMap = isDevBuild
    ? [
      // Plugins that apply in development builds only
      new webpack.SourceMapDevToolPlugin({
        // Point sourcemap entries to the original file locations on disk
        moduleFilenameTemplate: path.relative('./public/client', '[resourcePath]')
      })
    ] : [
      //https://webpack.js.org/guides/migrating/#uglifyjsplugin-sourcemap
      //Plugins that apply in production builds only
      new webpack.optimize.UglifyJsPlugin({
        parallel: true,
      })
    ]

  // Configuration for client-side bundle suitable for running in browsers
  const clientBundleConfig = merge(sharedConfig(), {
    entry: {
      'main-client': './src/boot-client.tsx'
    },
    output: {
      path: path.join(__dirname, './public/client')
    },
    plugins: pluginMap,
  });
  // Configuration for server-side (prerendering) bundle suitable for running in Node
  const serverBundleConfig = merge(sharedConfig(), {
    entry: {
      'main-server': './src/boot-server.tsx'
    },
    output: {
      libraryTarget: 'commonjs',
      path: path.join(__dirname, './public/server')
    },
    //https://webpack.js.org/configuration/resolve/#resolve-mainfields
    //import only main from package
    resolve: {
      mainFields: ['main']
    },
    plugins: pluginMap,
    target: 'node',
  });

  return [clientBundleConfig, serverBundleConfig];
};