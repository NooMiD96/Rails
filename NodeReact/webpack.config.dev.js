const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        'main-client': [
            'webpack-hot-middleware/client?path=/__webpack_hmr',
            'babel-polyfill',
            path.join(__dirname, './ClientApp/boot-client.jsx'),
        ],
    },
    //https://webpack.js.org/configuration/stats/
    // Add built modules information
    stats: true,
    //https://webpack.js.org/configuration/module/
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                require.resolve('style-loader'),
                {
                    loader: require.resolve('css-loader'),
                    options: { importLoaders: 1 },
                },
            ],
        }],
    },
    // Plugins that apply in development builds only
    // new webpack.SourceMapDevToolPlugin({
    //     moduleFilenameTemplate: path.relative('./server/dist', '[resourcePath]') // Point sourcemap entries to the original file locations on disk
    // }),
    plugins: [
        // create html file
        new HtmlWebpackPlugin({
            inject: true,
            template: './index.html'
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'}),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'eval-source-map',
};